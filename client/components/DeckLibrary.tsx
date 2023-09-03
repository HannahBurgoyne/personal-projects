import { useQuery } from '@tanstack/react-query'
import { fetchAllDecks } from '../apiClient'
import Flashcards from './Flashcards'
import { useState } from 'react'
import AddNewDeck from './AddNewDeck'
// This is where the deck library lives
// Sits inside layout

function DeckLibrary() {
  const { data } = useQuery(['deck'], fetchAllDecks)
  const [useFlashcards, setUseFlashcards] = useState(false)
  const [showAdd, setShowAdd] = useState(false)

  // have an onclick function to show flashcards for the deck you click on

  function showFlashcards() {
    setUseFlashcards(!false)
  }

  function showAddForm() {
    setShowAdd(!false)
  }

  return (
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

              <div>
                <button onClick={showAddForm} className="add-deck-btn">
                  Add new deck
                </button>
              </div>
            </div>

            {useFlashcards ? (
              <>
                <section className="use-flashcards-container">
                  <Flashcards id={deck.id} />
                </section>
              </>
            ) : (
              ''
            )}

            {showAdd ? (
              <>
                <section className="add-deck-container">
                  <AddNewDeck />
                </section>
              </>
            ) : (
              ''
            )}
          </>
        ))}
    </div>
  )
}

export default DeckLibrary
