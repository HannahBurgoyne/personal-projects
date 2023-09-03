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
              <div className="library-container">
                <div key={`flashcard ${deck.id}`} className="deck-container">
                  <div className="deck-content">
                    <h2 className="deck-title" key={`name ${deck.id}`}>
                      {deck.deck_name}
                    </h2>
                    <h4 className="deck-author" key={`author ${deck.id}`}>
                      {deck.author}
                    </h4>
                    <button className="deck-button" onClick={showFlashcards}>
                      Use deck
                    </button>
                  </div>
                </div>

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
