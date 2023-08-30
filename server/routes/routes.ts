import express from 'express'
import {
  addNewDeck,
  addNewFlashcard,
  deleteDeck,
  deleteFlashcard,
  getAllDecks,
  getAllFlashcards,
  updateFlashcard,
} from '../db/db'
import { Flashcard } from '../../models/models'

const router = express.Router()

// DECK ROUTES //

// WORKING IN INSOMNIA
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

// WORKING IN INSOMNIA
router.post('/', async (req, res) => {
  try {
    const newDeck = req.body
    await addNewDeck(newDeck)
    res.sendStatus(201)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message)
    }
  }
})

// WORKING IN INSOMNIA
router.delete('/:deckId', async (req, res) => {
  try {
    const deckId = Number(req.params.deckId)
    await deleteDeck(deckId)
    res.sendStatus(200)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message)
    }
  }
})

// FLASHCARDS ROUTES //

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

// WORKING IN INSOMIA BUT TAKES A LONG ASS TIME
router.post('/:deckId/', async (req, res) => {
  try {
    const deckId = Number(req.params.deckId)
    const newFlashcard = req.body
    await addNewFlashcard(deckId, newFlashcard)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message)
    }
  }
})

router.delete('/:flashcardId', async (req, res) => {
  try {
    const flashcardId = Number(req.params.flashcardId)
    await deleteFlashcard(flashcardId)
    res.sendStatus(200)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message)
    }
  }
})

router.patch('/:flashcardId', async (req, res) => {
  try {
    const flashcardId = Number(req.params.flashcardId)
    const updatedFlashcard = req.body
    await updateFlashcard(flashcardId, updatedFlashcard)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message)
    }
  }
})

export default router
