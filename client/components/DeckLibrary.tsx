import { useQuery } from '@tanstack/react-query'
import { fetchAllDecks } from '../apiClient'
import Flashcards from './Flashcards'
import { useState } from 'react'
// This is where the deck library lives
// Sits inside layout

function DeckLibrary() {
  const { data } = useQuery(['deck'], fetchAllDecks)
  const [useFlashcards, setUseFlashcards] = useState(false)

  // have an onclick function to show flashcards for the deck you click on

  function showFlashcards() {
    setUseFlashcards(!false)
  }

  return (
    <section>
      <div>
        {data &&
          data.map((deck) => (
            <>
              <div key={`flashcard ${deck.id}`}>
                <h2 key={`name ${deck.id}`}>{deck.deck_name}</h2>
                <h4 key={`author ${deck.id}`}>{deck.author}</h4>
                <button onClick={showFlashcards}>Use deck</button>

                {useFlashcards ? (
                  <>
                    <Flashcards id={deck.id} />
                  </>
                ) : (
                  ''
                )}
              </div>
            </>
          ))}
      </div>
    </section>
  )
}

export default DeckLibrary
