import { useQuery } from '@tanstack/react-query'
import { fetchDeck } from '../apiClient'
import { FlashcardData } from '../../models/models'
import { useEffect, useState } from 'react'
import Card from './Card'
import EditCard from './EditCard'
import { useParams } from 'react-router-dom'

function Flashcards() {
  const { deckId } = useParams()
  const dataId = Number(deckId)

  const queryKey = ['flashcards', deckId]

  const { data, isLoading, isError } = useQuery(queryKey, () =>
    fetchDeck(dataId)
  )
  const [isFlipped, setIsFlipped] = useState(false)
  const [counter, setCounter] = useState(0)
  const [clickEnabled, setClickEnabled] = useState(true)
  const [showEdit, setShowEdit] = useState(false)
  const [shuffledCards, setShuffledCards] = useState([] as FlashcardData[])

  function showEditPage() {
    setShowEdit(!showEdit)
  }

  // Shuffle the cards when the data is available
  useEffect(() => {
    if (!isLoading && !isError && data) {
      const shuffledData = randomizeCards(data)
      setShuffledCards(shuffledData)
    }
  }, [isLoading, isError, data])

  // Function to shuffle the cards
  function randomizeCards(cards: FlashcardData[]) {
    return [...cards].sort(() => Math.random() - 0.5)
  }

  function nextCard() {
    if (counter === shuffledCards.length - 1) {
      setCounter(0)
    } else {
      setCounter((prevCounter) => prevCounter + 1)
    }
    setClickEnabled(true)
    setIsFlipped(false)
  }

  const currentCard = shuffledCards[counter]

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
          {currentCard && (
            <Card
              {...{
                currentCard,
                clickEnabled,
                setClickEnabled,
                isFlipped,
                setIsFlipped,
              }}
            />
          )}
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
