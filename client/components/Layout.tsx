import { Outlet } from 'react-router-dom'
// This is the layout everything sits upon
// Outlet goes in here

function Layout() {
  return (
    <main>
      <p>This is the layout</p>
      <h1>Flashcards</h1>
      <div id="parent-container">
        <div className="column">
          <div className="flashcard-design">
            <a href="#">Topic 1</a>
          </div>
        </div>

        <div className="column">
          <div className="flashcard-design">
            <a href="#">Topic 2</a>
          </div>
        </div>

        <div className="column">
          <div className="flashcard-design">
            <a href="#">Topic 3</a>
          </div>
        </div>
      </div>
      <Outlet />
    </main>
  )
}

export default Layout
