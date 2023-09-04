import connection from './connection'
import { Deck, Flashcard, NewDeck, NewFlashcard } from '../../models/models'

// function to get all decks - call the decks db
export function getAllDecks(db = connection): Promise<Deck[]> {
  return db<Deck>('decks').select()
}

// SEE IF YOU CAN REFACTOR THE BELOW 3 FUNCTIONS INTO ONE USING TRANSACTIONS

// function to add a new deck - call the decks db
export function addNewDeck(newDeck: NewDeck, db = connection): Promise<Deck[]> {
  return db<Deck>('decks').insert(newDeck)
}

// function to add a new flashcard to a deck - call the flashcards, decks, and deck-flashcards db
export async function addNewFlashcard(
  flashcards: Flashcard[],
  db = connection
) {
  const flashcardsData = flashcards.map((flashcard) => ({
    number: flashcard.number,
    question: flashcard.question,
    answer: flashcard.answer,
  }))
  console.log('db flashdata', flashcardsData)

  return db<Flashcard>('flashcards').insert(flashcardsData).returning('')
}

// function to add flashcard ids and deck id to junction db
export async function addNewFlashcardsToDeck(
  { id, flashcards }: Deck,
  db = connection
) {
  const flashcardsData = flashcards.map((flashcard) => ({
    deck_id: id,
    flashcard_id: flashcard.number,
  }))

  await db('joining_table').insert(flashcardsData)
}

export async function deleteDeckAndFlashcards(deckId: number, db = connection) {
  try {
    await db.transaction(async (trx) => {
      // find flashcards associated with the deck
      const flashcardIds = await trx('deck-flashcards')
        .where('deck_id', deckId)
        .pluck('flashcard_id')

      // delete rows in junction table
      await trx('deck-flashcards').where('deck_id', deckId).del()

      // delete deck
      await trx('decks').where('id', deckId).del()

      // delete flashcards
      await trx('flashcards').whereIn('id', flashcardIds).del()
    })
  } catch (error) {
    console.error('Error deleting deck and flashcards:', error)
    throw error
  }
}

// function to get all flashcards in a deck - call the flashcards, decks, and joining table db
// export function getAllFlashcards(
//   deckId: number,
//   db = connection
// ): Promise<Flashcard[]> {
//   return db<Flashcard>('flashcards')
//     .join(
//       'joining_table',
//       'flashcards.number as flashcardId',
//       'joining_table.flashcard_id'
//     )
//     .join('decks', 'joining_table.deck_id', 'deck.id as deckId')
//     .where('deckId', deckId)
//     .select()
// }

export function getAllFlashcards(
  deckId: number,
  db = connection
): Promise<Flashcard[]> {
  return db<Flashcard>('flashcards')
    .join(
      'joining_table',
      'flashcards.number',
      '=',
      'joining_table.flashcard_id'
    )
    .join('decks', 'joining_table.deck_id', '=', 'decks.id')
    .where('deckId', deckId)
    .select(
      'flashcards.number as flashcardId',
      'decks.id as deckId',
      'flashcards.*'
    )
}

// function to delete a flashcard from a deck - call the flashcards, decks, and deck-flashcards db
export function deleteFlashcard(
  flashcardId: number,
  db = connection
): Promise<Flashcard[]> {
  return db<Flashcard>('flashcards')
    .join(
      'joining_table',
      'flashcards.number as flashcardId',
      'joining_table.flashcard_id'
    )
    .join('decks', 'joining_table.deck_id', 'deck.id as deckId')
    .where('flashcardId', flashcardId)
    .del()
}
// function to update a flashcard in a deck - call the flashcards, decks, and deck-flashcards db
export function updateFlashcard(
  flashcardId: number,
  updatedFlashcard: NewFlashcard,
  db = connection
): Promise<Flashcard[]> {
  return db<Flashcard>('flashcards')
    .join(
      'joining_table',
      'flashcards.number as flashcardId',
      'joining_table.flashcard_id'
    )
    .join('decks', 'joining_table.deck_id', 'deck.id as deckId')
    .where('flashcardId', flashcardId)
    .update(updatedFlashcard)
}
