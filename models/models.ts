// Example deck seed:

// {
//   "deck_name": "example deck",
//   "author": "Anon",
//   "flashcards": [
// 		{"number": 1,
// 		"question": "hello",
// 		"answer": "bonjour"},
// 		{"number": 2,
// 		"question": "goodbye",
// 		"answer": "au revoir"},
// 		{"number": 3,
// 		"question": "yes",
// 		"answer": "oui"},
// 		{"number": 4,
// 		"question": "no",
// 		"answer": "non"},
// 		{"number": 5,
// 		"question": "thank you",
// 		"answer": "merci"}
// 	]
// }

export interface NewFlashcard {
  question: string
  answer: string
}

// export interface Flashcard extends NewFlashcard {
//   number: number
// }

export interface FlashcardData {
  flashcardId: number
  deckId: number
  number: number
  question: string
  answer: string
}

export interface NewDeck {
  deck_name: string
  author: string
  flashcards: Flashcard[]
}

export interface Deck extends NewDeck {
  id: number
}

export interface AllDecks {
  decks: Deck[]
}
