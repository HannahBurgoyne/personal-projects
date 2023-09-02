import request from 'superagent'
import { Deck, Flashcard } from '../models/models'

const baseUrl = '/api/v1/flashcardsapp/'

export async function fetchAllDecks() {
  const data = await request.get(baseUrl)
  return data.body as Deck[]
}

export async function fetchDeck(deckId: number) {
  const data = await request.get(`${baseUrl}${deckId}`)
  return data.body as Flashcard[]
}

export async function addNewDeck(deckId: number, deckData: Deck) {
  await request.post(`${baseUrl}${deckId}`).send(deckData)
}

export async function deleteDeck(deckId: number) {
  await request.delete(`${baseUrl}${deckId}`)
}