import { useQuery } from '@tanstack/react-query'
import { fetchAllDecks } from '../apiClient'
import { Link } from 'react-router-dom'
// This is where the deck library lives
// Sits inside layout



function DeckLibrary() {
  const { data } = useQuery(['deck'], fetchAllDecks)



  return( 
  <>
  <section>
    <div>
      { data && data.map ((deck) => (
        <div key={deck.id}>
          <h2>{deck.deck_name}</h2>
          <h4>{deck.author}</h4>
          <Link to={`/${deck.id}`}><button>Use deck</button></Link>
        </div>
      ))}
    </div>
  </section>
  </>)
}

export default DeckLibrary
