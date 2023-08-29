import connection from './connection'
import { Deck, Flashcard, NewFlashcard } from '../../models/models'

// function to get all decks - call the decks db
export function getAllDecks(db = connection): Promise<Deck[]> {
  return db<Deck>('decks').select()
}

// function to add a new deck - call the decks db
export function addNewDeck(newDeck: Deck, db = connection): Promise<Deck[]> {
  return db<Deck>('decks').insert(newDeck)
}

// function to delete a deck - call the decks db
export function deleteDeck(deckId: number, db = connection): Promise<Deck[]> {
  return db<Deck>('decks').where('deckId', deckId).del()
}

// function to get all flashcards in a deck - call the flashcards, decks, and deck-flashcards db
export function getAllFlashcards(
  deckId: number,
  db = connection
): Promise<Flashcard[]> {
  return db<Flashcard>('flashcards')
    .join(
      'deck-flashcards',
      'flashcards.id as flashcardId',
      'deck-flashcards.flashcard_id'
    )
    .join('decks', 'deck-flashcards.deck_id', 'deck.id as deckId')
    .where('deckId', deckId)
    .select()
}

// function to add a new flashcard to a deck - call the flashcards, decks, and deck-flashcards db
export function addNewFlashcard(
  deckId: number,
  newFlashcard: NewFlashcard,
  db = connection
): Promise<Flashcard[]> {
  return db<Flashcard>('flashcards')
    .join(
      'deck-flashcards',
      'flashcards.id as flashcardId',
      'deck-flashcards.flashcard_id'
    )
    .join('decks', 'deck-flashcards.deck_id', 'deck.id as deckId')
    .where('deckId', deckId)
    .insert(newFlashcard)
}

// function to delete a flashcard from a deck - call the flashcards, decks, and deck-flashcards db
export function deleteFlashcard(
  flashcardId: number,
  db = connection
): Promise<Flashcard[]> {
  return db<Flashcard>('flashcards')
    .join(
      'deck-flashcards',
      'flashcards.id as flashcardId',
      'deck-flashcards.flashcard_id'
    )
    .join('decks', 'deck-flashcards.deck_id', 'deck.id as deckId')
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
      'deck-flashcards',
      'flashcards.id as flashcardId',
      'deck-flashcards.flashcard_id'
    )
    .join('decks', 'deck-flashcards.deck_id', 'deck.id as deckId')
    .where('flashcardId', flashcardId)
    .update(updatedFlashcard)
}
