import * as z from 'zod'

export const newFlashcardSchema = z.object({
  question: z.string(),
  answer: z.string(),
})
export type NewFlashcard = z.infer<typeof newFlashcardSchema>

export const flashcardSchema = newFlashcardSchema.extend({
  id: z.number(),
  number: z.number(),
})
export type Flashcard = z.infer<typeof flashcardSchema>

export const flashcardInfoSchema = z.object({
  deckId: z.number(),
  flashcardId: z.number(),
})
export type FlashcardInfo = z.infer<typeof flashcardInfoSchema>

export const flashcardDataSchema = flashcardInfoSchema.extend({
  number: z.number(),
  question: z.string(),
  answer: z.string(),
})
export type FlashcardData = z.infer<typeof flashcardDataSchema>

export const newDeckSchema = z.object({
  deck_name: z.string(),
  author: z.string(),
})
export type NewDeck = z.infer<typeof newDeckSchema>

export const deckSchema = newDeckSchema.extend({
  id: z.number(),
  flashcards: z.array(flashcardSchema),
})
export type Deck = z.infer<typeof deckSchema>

export const allDecksSchema = z.object({
  decks: z.array(deckSchema),
})
export type AllDecks = z.infer<typeof allDecksSchema>
