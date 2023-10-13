// This is where you loop through the flashcards deck
// Sits inside layout

import { useQuery } from '@tanstack/react-query'
import { fetchDeck } from '../apiClient'
import { FlashcardData } from '../../models/models'
import { useEffect, useState } from 'react'
import Card from './Card'
import EditCard from './EditCard'
import { useParams } from 'react-router-dom'

// interface Props {
//   id: number | null
// }

function Flashcards() {
  const { deckId } = useParams()
  const dataId = Number(deckId)

  const queryKey = ['flashcards', deckId]

  const { data, isLoading, isError } = useQuery(queryKey, () =>
    fetchDeck(dataId)
  )
  const [counter, setCounter] = useState(0)
  const [clickEnabled, setClickEnabled] = useState(true)
  const [showEdit, setShowEdit] = useState(false)

  function showEditPage() {
    setShowEdit(!showEdit)
  }

  let shuffledCards: FlashcardData[] = []

  if (!isLoading && !isError && data) {
    // Create an array of card indexes and shuffle it
    const cardIndexes = Array.from({ length: data.length }, (_, index) => index)
    const shuffledIndexes = randomizeCards(cardIndexes)

    // Use the shuffled indexes to reorder the cards while preserving the pairing
    shuffledCards = shuffledIndexes.map((index) => data[index])
  }

  //--- function to randomise deck ---//
  function randomizeCards(cards: any[]) {
    const shuffledDeck = [...cards].sort(() => Math.random() - 0.5)
    return shuffledDeck
  }

  // Only shuffle the cards when data is available and there are no errors
  if (!isLoading && !isError && data) {
    shuffledCards = randomizeCards(data)
  }

  function nextCard() {
    if (counter == 4) {
      setCounter(0)
    } else {
      setCounter((prevCounter) => prevCounter + 1)
      console.log(counter)
    }
    setClickEnabled(true)
  }

  const currentCard = shuffledCards[counter]
  console.log('current', currentCard)

  return (
    <>
      {showEdit ? (
        data?.map((card) => <EditCard card={card} />)
      ) : isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error fetching data</p>
      ) : shuffledCards.length > 0 ? (
        <>
          {currentCard && <Card currentCard={currentCard} />}
          <button onClick={nextCard}>Next card</button>
          <button onClick={showEditPage} className="add-deck-btn">
            Edit deck
          </button>
        </>
      ) : (
        <p>No flashcards available</p>
      )}
    </>
  )
}

export default Flashcards
