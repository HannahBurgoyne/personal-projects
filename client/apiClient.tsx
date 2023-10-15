import request from 'superagent'
import {
  Deck,
  Flashcard,
  FlashcardData,
  FlashcardInfo,
  NewDeck,
  NewFlashcard,
} from '../models/models'

const baseUrl = '/api/v1/flashcardsapp/'

export async function fetchAllDecks() {
  const data = await request.get(baseUrl)
  return data.body as Deck[]
}

export async function fetchDeck(deckId: number) {
  const data = await request.get(`${baseUrl}${deckId}`)
  return data.body as FlashcardData[]
}

export async function addNewDeck(deckData: Deck) {
  const deckId = deckData.id
  await request.post(`${baseUrl}${deckId}`).send(deckData)
}

export async function deleteDeck(deckId: number) {
  await request.delete(`${baseUrl}${deckId}`)
}

export async function updateFlashcard(card: FlashcardData) {
  const flashcardId = card.flashcardId
  const deckId = card.deckId
  await request.patch(`${baseUrl}${deckId}/${flashcardId}`).send(card)
}

export async function deleteCard(data: FlashcardInfo) {
  const flashcardId = data.flashcardId
  const deckId = data.deckId
  await request.delete(`${baseUrl}${deckId}/${flashcardId}`)
}
