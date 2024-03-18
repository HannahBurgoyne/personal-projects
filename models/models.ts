import * as z from 'zod'

const charLimitMsg = 'Must be fewer than 20 characters'

export const newFlashcardSchema = z.object({
  question: z.string().max(20, { message: charLimitMsg }),
  answer: z.string().max(20, { message: charLimitMsg }),
})
export type NewFlashcard = z.infer<typeof newFlashcardSchema>

export const flashcardSchema = newFlashcardSchema.extend({
  id: z.number().max(20, { message: charLimitMsg }),
  number: z.number().max(20, { message: charLimitMsg }),
})
export type Flashcard = z.infer<typeof flashcardSchema>

export const flashcardInfoSchema = z.object({
  deckId: z.number().max(20, { message: charLimitMsg }),
  flashcardId: z.number().max(20, { message: charLimitMsg }),
})
export type FlashcardInfo = z.infer<typeof flashcardInfoSchema>

export const flashcardDataSchema = flashcardInfoSchema.extend({
  number: z.number().max(20, { message: charLimitMsg }),
  question: z.string().max(20, { message: charLimitMsg }),
  answer: z.string().max(20, { message: charLimitMsg }),
})
export type FlashcardData = z.infer<typeof flashcardDataSchema>

export const newDeckSchema = z.object({
  deck_name: z.string().max(20, { message: charLimitMsg }),
  author: z.string().max(20, { message: charLimitMsg }),
})
export type NewDeck = z.infer<typeof newDeckSchema>

export const deckSchema = newDeckSchema.extend({
  id: z.number().max(20, { message: charLimitMsg }),
  flashcards: z.array(flashcardSchema),
})
export type Deck = z.infer<typeof deckSchema>

export const allDecksSchema = z.object({
  decks: z.array(deckSchema),
})
export type AllDecks = z.infer<typeof allDecksSchema>
