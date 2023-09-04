// This is where you loop through the flashcards deck
// Sits inside layout

import { useQuery } from '@tanstack/react-query'
import { fetchDeck } from '../apiClient'
import { FlashcardData } from '../../models/models'
import { useEffect, useState } from 'react'
import Card from './Card'

interface Props {
  id: number
}

function Flashcards(props: Props) {
  const deckId = props.id
  const queryKey = ['flashcards', deckId]

  const { data, isLoading, isError } = useQuery(queryKey, () =>
    fetchDeck(deckId)
  )
  const [counter, setCounter] = useState(0)
  // const [isFlipped, setIsFlipped] = useState(false)
  const [clickEnabled, setClickEnabled] = useState(true)
  // const [currentCard, setCurrentCard] = useState({} as)

  // function handleKeyDown(e) {
  //   console.log('working')
  //   if (e.key === 'ArrowRight') {
  //     console.log(e.key)
  //     nextCard()
  //   }

  //   if (e.key === 'ArrowLeft') {
  //     console.log(e.key)
  //     nextCard()
  //   }
  // }

  let shuffledCards: FlashcardData[] = []

  if (!isLoading && !isError && data) {
    // Create an array of card indexes and shuffle it
    const cardIndexes = Array.from({ length: data.length }, (_, index) => index)
    const shuffledIndexes = randomizeCards(cardIndexes)

    // Use the shuffled indexes to reorder the cards while preserving the pairing
    shuffledCards = shuffledIndexes.map((index) => data[index])
  }

  // useEffect(() => {
  //   console.log('use effect')
  //   const handleKeyDown = (e) => {
  //     if (data && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) {
  //       nextCard()
  //     }
  //   }

  //   // Add a condition to check if data is available

  //   window.addEventListener('keydown', handleKeyDown)

  //   // Remove the event listener when the component unmounts
  //   return () => {
  //     window.removeEventListener('keydown', handleKeyDown)
  //   }
  // }, [])

  //--- function to randomise deck ---//
  function randomizeCards(cards: any[]) {
    const shuffledDeck = [...cards].sort(() => Math.random() - 0.5)
    return shuffledDeck
  }

  // Only shuffle the cards when data is available and there are no errors
  if (!isLoading && !isError && data) {
    shuffledCards = randomizeCards(data)
  }

  console.log(shuffledCards)

  // function flipCard() {
  //   if (clickEnabled) {
  //     setIsFlipped(!isFlipped)
  //     // setClickEnabled(false)
  //   }
  // }

  function nextCard() {
    if (counter == 4) {
      setCounter(0)
    } else {
      setCounter((prevCounter) => prevCounter + 1)
      console.log(counter)
    }
    // setIsFlipped(false)
    setClickEnabled(true)
  }

  const currentCard = shuffledCards[counter]
  console.log('current', currentCard)
  // console.log('shuffled', shuffledCards)

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error fetching data</p>
      ) : shuffledCards.length > 0 ? (
        <>
          {currentCard && <Card currentCard={currentCard} />}
          <button onClick={nextCard}>Next card</button>
        </>
      ) : (
        <p>No flashcards available</p>
      )}
    </>
  )
}
//--- variables ---//
// let counter = 0
// let activeCard = document.getElementById('active-flashcard')
// let cardContent = document.getElementById('card-content')
// let shuffledDeck = randomizeCards(frenchVocab)

// // computer takes the shuffled deck, and iterates through it
// shuffledDeck.forEach((card) => {
//   cardContent.textContent = shuffledDeck[counter].q
//   activeCard.addEventListener('click', flipCard)
// })
// //--- function to flip the card ---//
// function flipCard() {
//   cardContent.textContent = shuffledDeck[counter].a
// }
// //--- function to go to next card ---//
// function nextCard() {
//   counter += 1
//   if (counter >= 5) {
//     counter = 0
//   }
//   cardContent.textContent = shuffledDeck[counter].q
// }
// //--- event listeners ---//
// document.addEventListener('keydown', function (evt) {
//   if (evt.key == 'ArrowRight') {
//     nextCard()
//   } else if (evt.key == 'ArrowLeft') {
//     nextCard()
//   }
// })

export default Flashcards
