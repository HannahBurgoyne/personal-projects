import connection from './connection'
import { Deck, Flashcard, NewDeck, NewFlashcard } from '../../models/models'

// function to get all decks - call the decks db
export function getAllDecks(db = connection): Promise<Deck[]> {
  return db<Deck>('decks').select()
}

// function to add a new deck - call the decks db
export function addNewDeck(newDeck: NewDeck, db = connection): Promise<Deck[]> {
  return db<Deck>('decks').insert(newDeck)
}

// function to delete a deck - call the decks db
export function deleteDeck(deckId: number, db = connection): Promise<Deck[]> {
  return db<Deck>('decks').where('id', deckId).del()
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

// function to add a new flashcard to a deck - call the flashcards, decks, and deck-flashcards db
export async function addNewFlashcard(
  flashcards: Flashcard[],
  db = connection
): Promise<Flashcard> {
  const flashcardsData = flashcards.map((flashcard) => ({
    number: flashcard.id,
    question: flashcard.question,
    answer: flashcard.answer,
  }))
  return db<Flashcard>('flashcards').insert(flashcardsData)
}

// function to add flashcard ids and deck id to junction db
export async function addNewFlashcardsToDeck(
  { id, flashcards }: Deck,
  db = connection
) {
  const flashcardsData = flashcards.map((flashcard) => ({
    deck_id: id,
    flashcard_id: flashcard.id,
  }))

  await db('joining_table').insert(flashcardsData)
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
