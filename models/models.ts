export interface NewFlashcard {
  question: string
  answer: string
}

export interface Flashcard extends NewFlashcard {
  id: number
}

export interface NewDeck {
  deck_name: string
  author: string
}

export interface Deck extends NewDeck {
  id: number
  flashcards: []
}

export interface AllDecks {
  decks: Deck[]
}
