import connection from './connection'
import { Deck, Flashcard, NewDeck, NewFlashcard } from '../../models/models'

// function to get all decks - call the decks db
export function getAllDecks(db = connection): Promise<Deck[]> {
  return db<Deck>('decks').select()
}

// // SEE IF YOU CAN REFACTOR THE BELOW 3 FUNCTIONS INTO ONE USING TRANSACTIONS

// // function to add a new deck - call the decks db
// export function addNewDeck(newDeck: NewDeck, db = connection): Promise<Deck[]> {
//   return db<Deck>('decks').insert(newDeck)
// }

// // function to add a new flashcard to a deck - call the flashcards, decks, and deck-flashcards db
// export async function addNewFlashcard(
//   flashcards: NewFlashcard[],
//   db = connection
// ) {
//   const flashcardsData = flashcards.map((flashcard) => ({
//     question: flashcard.question,
//     answer: flashcard.answer,
//   }))
//   // console.log('db flashdata', flashcardsData)

//   return db<Flashcard>('flashcards').insert(flashcardsData).returning('id')
// }

// // function to add flashcard ids and deck id to junction db
// export async function addNewFlashcardsToDeck(
//   { id, flashcards }: Deck,
//   db = connection
// ) {
//   // console.log('db flashcards', flashcards)
//   const addFlash = await addNewFlashcard(flashcards)
//   console.log('db addFlash: ', addFlash)

//   const flashcardsData = addFlash.map((flashcard) => ({
//     deck_id: id,
//     flashcard_id: flashcard.id,
//   }))

//   await db('joining_table').insert(flashcardsData)
// }

export async function addNewDeckWithFlashcards(
  newDeck: NewDeck,
  flashcards: NewFlashcard[],
  db = connection
) {
  return db.transaction(async (trx) => {
    // Insert the new deck and get its ID
    const [deckId] = await trx<Deck>('decks').insert(newDeck).returning('id')

    // Prepare flashcards data
    const flashcardsData = flashcards.map((flashcard) => ({
      question: flashcard.question,
      answer: flashcard.answer,
    }))

    // Insert the flashcards and get their IDs
    const flashcardIds = await trx<Flashcard>('flashcards')
      .insert(flashcardsData)
      .returning('id')

    // Prepare data for the junction table
    const junctionData = flashcardIds.map((flashcardId) => ({
      deck_id: deckId,
      flashcard_id: flashcardId,
    }))

    // Insert the junction data
    await trx('joining_table').insert(junctionData)
  })
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
    .join('joining_table', 'flashcards.id', '=', 'joining_table.flashcard_id')
    .join('decks', 'joining_table.deck_id', '=', 'decks.id')
    .where('decks.id', deckId)
    .select(
      'flashcards.id as flashcardId',
      'decks.id as deckId',
      'flashcards.*'
    )
}

// function to delete a flashcard from a deck - call the flashcards, decks, and deck-flashcards db
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

// function to update a flashcard in a deck - call the flashcards, decks, and deck-flashcards db
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
