import express from 'express'
import bodyParser from 'body-parser'
import {
  addNewDeckWithFlashcards,
  deleteDeckAndFlashcards,
  deleteFlashcard,
  getAllDecks,
  getAllFlashcards,
  updateFlashcard,
} from '../db/db'
import { Deck, Flashcard, NewFlashcard } from '../../models/models'

const router = express.Router()

// IMPORTANT: parses user inputted data to protect server from malicious activity
const jsonParser = bodyParser.json({ type: 'application/*+json' })

// GET ALL DECKS FOR THE DECK LIBRARY
router.get('/', async (req, res) => {
  try {
    const decks = await getAllDecks()
    res.json(decks)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error)
      res.status(500).send(error.message)
    }
  }
})

//CREATE A NEW DECK AND ALL ITS FLASHCARDS DATA
router.post('/:deckId', jsonParser, async (req, res) => {
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

    await addNewDeckWithFlashcards(newDeck, flashcards)

    res.sendStatus(201)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error)
      res.status(500).send(error.message)
    }
  }
})

// GET ALL FLASHCARDS CORRESPONDING TO A DECK ID
router.get('/:deckId', async (req, res) => {
  try {
    const deckId = Number(req.params.deckId)
    const flashcards = await getAllFlashcards(deckId)
    res.json(flashcards)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error)
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
      console.error(error)
      res.status(500).send(error.message)
    }
  }
})

// UPDATE A FLASHCARD WITHIN A DECK
router.patch('/:deckId/:flashcardId', jsonParser, async (req, res) => {
  try {
    const flashcardId = Number(req.params.flashcardId)
    const updatedFlashcard = req.body
    await updateFlashcard(flashcardId, updatedFlashcard)
    res.sendStatus(200)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error)
      res.status(500).send(error.message)
    }
  }
})

// DELETE A FLASHCARD WITHIN A DECK
router.delete('/:deckId/:flashcardId', async (req, res) => {
  try {
    const flashcardId = Number(req.params.flashcardId)
    await deleteFlashcard(flashcardId)
    res.sendStatus(200)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error)
      res.status(500).send(error.message)
    }
  }
})

export default router
