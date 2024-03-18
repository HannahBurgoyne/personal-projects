import connection from './connection'
import { Deck, Flashcard, NewDeck, NewFlashcard } from '../../models/models'

export function getAllDecks(db = connection): Promise<Deck[]> {
  return db<Deck>('decks').select()
}

export async function addNewDeckWithFlashcards(
  newDeck: NewDeck,
  flashcards: NewFlashcard[],
  db = connection
) {
  // Insert the new deck and get its ID
  const deck = await db<Deck>('decks').insert(newDeck).returning('id')

  // Prepare flashcards data
  const flashcardsData = flashcards.map((flashcard) => ({
    question: flashcard.question,
    answer: flashcard.answer,
  }))

  // Insert the flashcards and get their IDs
  const flashcardIds = await db<Flashcard>('flashcards')
    .insert(flashcardsData)
    .returning('id')

  // Prepare data for the junction table
  const junctionData = flashcardIds.map((flashcardId) => ({
    deck_id: deck[0].id,
    flashcard_id: flashcardId.id,
  }))

  // Insert the junction data
  await db('joining_table').insert(junctionData)
}

export async function deleteDeckAndFlashcards(deckId: number, db = connection) {
  try {
    await db.transaction(async (trx) => {
      // Find flashcards associated with the deck
      const flashcardIds = await trx('joining_table')
        .where('deck_id', deckId)
        .pluck('flashcard_id')

      // Delete rows in the junction table
      await trx('joining_table').where('deck_id', deckId).del()

      // Delete deck
      await trx('decks').where('id', deckId).del()

      // Delete flashcards using .whereIn
      await trx('flashcards').whereIn('id', flashcardIds).del()
    })
  } catch (error) {
    console.error('Error deleting deck and flashcards:', error)
    throw error
  }
}

export function getAllFlashcards(
  deckId: number,
  db = connection
): Promise<Flashcard[]> {
  return db<Flashcard>('flashcards')
    .join('joining_table', 'flashcards.id', '=', 'joining_table.flashcard_id')
    .join('decks', 'joining_table.deck_id', '=', 'decks.id')
    .where('joining_table.deck_id', deckId)
    .select(
      'flashcards.id as flashcardId',
      'decks.id as deckId',
      'flashcards.*'
    )
}

export function deleteFlashcard(
  flashcardId: number,
  db = connection
): Promise<Flashcard[]> {
  return db.transaction((trx) => {
    return trx('joining_table')
      .where('flashcard_id', flashcardId)
      .del()
      .then(() => {
        return trx('flashcards').where('id', flashcardId).del()
      })
  })
}

export function updateFlashcard(
  flashcardId: number,
  updatedFlashcard: Flashcard,
  db = connection
): Promise<Flashcard[]> {
  return db<Flashcard>('flashcards').where('id', flashcardId).update({
    question: updatedFlashcard.question,
    answer: updatedFlashcard.answer,
  })
}
