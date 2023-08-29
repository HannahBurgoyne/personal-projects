export interface NewFlashcard {
  question: string
  answer: string
}

export interface Flashcard extends NewFlashcard {
  id: number
}

export interface Deck {
  id: string
  author: string
  flashcards: []
}

export interface AllDecks {
  decks: Deck[]
}
