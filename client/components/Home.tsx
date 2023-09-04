// Home page, root route
// Sits inside layout

import { Link } from 'react-router-dom'

function Home() {
  return (
    <>
      <main>
        <div className="home-flashcard">
          <h1>Welcome to flashcards</h1>
        </div>
        <Link to="/deck-library">
          <button>Enter deck library</button>
        </Link>
      </main>
    </>
  )
}

export default Home
