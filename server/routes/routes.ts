import express from 'express'
import {
  addNewDeck,
  addNewFlashcard,
  addNewFlashcardsToDeck,
  deleteDeckAndFlashcards,
  getAllDecks,
  getAllFlashcards,
} from '../db/db'
import { Deck, Flashcard } from '../../models/models'

const router = express.Router()

// WORKING IN INSOMNIA - GET ALL DECKS FOR THE DECK LIBRARY
router.get('/', async (req, res) => {
  try {
    const decks = await getAllDecks()
    res.json(decks)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message)
    }
  }
})

// WORKING IN INSOMNIA - CREATE A NEW DECK AND ALL ITS FLASHCARDS DATA
router.post('/:deckId', async (req, res) => {
  try {
    const { deck_name, author, flashcards } = req.body
    const deckFlashcardsData: Deck = {
      id: Number(req.params.deckId),
      deck_name: deck_name,
      author: author,
      flashcards: flashcards as Flashcard[],
    }

    const newDeck = {
      deck_name,
      author,
    }
    console.log({ newDeck })
    await addNewDeck(newDeck)
    console.log({ flashcards })
    // This db func is not working
    await addNewFlashcard(flashcards)
    console.log({ deckFlashcardsData })

    await addNewFlashcardsToDeck(deckFlashcardsData)

    res.sendStatus(201)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message)
    }
  }
})

// GET ALL FLASHCARDS CORRESPONDING TO A DECK ID - WORKING
router.get('/:deckId', async (req, res) => {
  try {
    const deckId = Number(req.params.deckId)
    const flashcards = await getAllFlashcards(deckId)
    res.json(flashcards)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message)
    }
  }
})

// DELETE A DECK AND ALL CORRESPONDING FLASHCARDS
router.delete('/:deckId', async (req, res) => {
  try {
    const deckId = Number(req.params.deckId)
    await deleteDeckAndFlashcards(deckId)
    res.sendStatus(200)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message)
    }
  }
})

// NO LONGER NEEDED BUT USE AS REFERENCE FOR ABOVE FUNC
// router.delete('/:flashcardId', async (req, res) => {
//   try {
//     const flashcardId = Number(req.params.flashcardId)
//     await deleteFlashcard(flashcardId)
//     res.sendStatus(200)
//   } catch (error) {
//     if (error instanceof Error) {
//       res.status(500).send(error.message)
//     }
//   }
// })
// // WORKING IN INSOMNIA - change this to delete deck, and all flashcards associated with it
// router.delete('/:deckId', async (req, res) => {
//   try {
//     const deckId = Number(req.params.deckId)
//     await deleteDeck(deckId)
//     res.sendStatus(200)
//   } catch (error) {
//     if (error instanceof Error) {
//       res.status(500).send(error.message)
//     }
//   }
// })

// FLASHCARDS ROUTES //

// STRETCH
// router.patch('/:flashcardId', async (req, res) => {
//   try {
//     const flashcardId = Number(req.params.flashcardId)
//     const updatedFlashcard = req.body
//     await updateFlashcard(flashcardId, updatedFlashcard)
//   } catch (error) {
//     if (error instanceof Error) {
//       res.status(500).send(error.message)
//     }
//   }
// })

export default router
