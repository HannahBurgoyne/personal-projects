import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteDeck, fetchAllDecks } from '../apiClient'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function DeckLibrary() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { data } = useQuery(['deck'], fetchAllDecks)

  const deleteMutation = useMutation({
    mutationFn: (deckId: number) => deleteDeck(deckId),
    onSuccess: () => {
      queryClient.invalidateQueries(['deck'])
    },
  })

  async function handleDelClick(
    e: React.MouseEvent<HTMLButtonElement>,
    deckId: number
  ) {
    e.preventDefault()
    deleteMutation.mutate(deckId)
  }

  return (
    <div className="parent-deck-library">
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
                    <button
                      className="deck-button"
                      onClick={(e) => handleDelClick(e, deck.id)}
                    >
                      Delete deck
                    </button>
                  </div>
                </div>
              </div>
            </>
          ))}
        <div className="add-new-container">
          <button
            // The following line ensures no duplicate deck ids in database when adding a new deck
            onClick={() => navigate(`/add-new/${data ? data.length + 1 : ''}`)}
            className="add-deck-btn"
          >
            Add new deck
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeckLibrary
