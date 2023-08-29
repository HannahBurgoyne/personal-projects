export interface Flashcard {
  id: number
  question: string
  answer: string
}

export interface Deck {
  id: string
  author: string
  flashcards: []
}

export interface AllDecks {
  decks: Deck[]
}
