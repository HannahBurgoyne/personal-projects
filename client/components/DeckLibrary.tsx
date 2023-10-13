import { useQuery } from '@tanstack/react-query'
import { fetchAllDecks } from '../apiClient'
import Flashcards from './Flashcards'
import { useState } from 'react'
import AddNewDeck from './AddNewDeck'
import EditMode from './EditCard'
import { useNavigate } from 'react-router-dom'
// This is where the deck library lives
// Sits inside layout

function DeckLibrary() {
  const navigate = useNavigate()
  const { data } = useQuery(['deck'], fetchAllDecks)
  // const [useFlashcards, setUseFlashcards] = useState(false)
  const [showAdd, setShowAdd] = useState(false)
  // const [selectedDeckId, setSelectedDeckId] = useState<number | null>(null)

  // function showFlashcards(deckId: number) {
  //   setSelectedDeckId(deckId)
  // }

  function showAddForm() {
    setShowAdd(!showAdd)
  }

  return (
    <div className="parent-deck-library">
      {/* {showAdd ? (
        <section className="add-deck-container">
          <AddNewDeck total={data?.length} showAdd={showAdd} />
        </section>
      ) : (
        <> */}
      <div className="decks">
        {data &&
          data.map((deck) => (
            <>
              <div className="library-container">
                <div key={`deck ${deck.id}`} className="deck-container">
                  <div className="deck-content">
                    <h2 className="deck-title" key={`name ${deck.id}`}>
                      {deck.deck_name}
                    </h2>
                    <h4 className="deck-author" key={`author ${deck.id}`}>
                      {deck.author}
                    </h4>
                    <button
                      className="deck-button"
                      onClick={() => navigate(`/deck/${deck.id}`)}
                    >
                      Use deck
                    </button>
                    {/* <button>Go to deck library</button> */}
                  </div>
                </div>
              </div>
            </>
          ))}
        <div className="add-new-container">
          <button onClick={showAddForm} className="add-deck-btn">
            Add new deck
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeckLibrary
