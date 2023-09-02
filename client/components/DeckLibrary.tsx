import { useQuery } from '@tanstack/react-query'
import { fetchAllDecks } from '../apiClient'
import { Link } from 'react-router-dom'
import Flashcards from './Flashcards'
import { useState } from 'react'
// This is where the deck library lives
// Sits inside layout



function DeckLibrary() {
  const { data } = useQuery(['deck'], fetchAllDecks)
  const [useFlashcards, setUseFlashcards] = useState(false)


  // have an onclick function to show flashcards for the deck you click on


  return( 
  <section>
    <div>
      { data && data.map ((deck) => (
        <>
        <div key={deck.id}>
          <h2>{deck.deck_name}</h2>
          <h4>{deck.author}</h4>
          <button>Use deck</button>

        {useFlashcards ? (
          <>
          <Flashcards id={deck.id} />
          </>
        ) : ('')
        }
        </div>    
  </>
  ))}
  </div>
  </section>
)
}

export default DeckLibrary
