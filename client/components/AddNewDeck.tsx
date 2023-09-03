// This contains the form to add a new deck
// Sits inside the layout, linked from deck library - or nested inside deck library as a toggle component

function AddNewDeck() {
  return (
    <>
      <div className="addformcontainer">
        <h1>Add new deck</h1>
        <div className="add-form">
          <form>
            <label htmlFor="deck">Give your deck a name and author</label>
            <input
              className="new deck"
              placeholder="deck name"
              type="text"
              name="deckName"
            ></input>
            <input
              className="new deck"
              placeholder="deck author"
              type="text"
              name="deckAuthor"
            ></input>
            <h4>Enter your flashcards</h4>
            <label htmlFor="flashcards">Card 1</label>
            <input
              className="new deck"
              placeholder="question "
              type="text"
              name="flashcard"
            ></input>
            <input
              className="new deck"
              placeholder="answer "
              type="text"
              name="flashcard"
            ></input>
            <label htmlFor="flashcards">Card 2</label>
            <input
              className="new deck"
              placeholder="question"
              type="text"
              name="flashcard"
            ></input>
            <input
              className="new deck"
              placeholder="answer"
              type="text"
              name="flashcard"
            ></input>
            <label htmlFor="flashcards">Card 3</label>
            <input
              className="new deck"
              placeholder="question"
              type="text"
              name="flashcard"
            ></input>
            <input
              className="new deck"
              placeholder="answer"
              type="text"
              name="flashcard"
            ></input>
            <label htmlFor="flashcards">Card 4</label>
            <input
              className="new deck"
              placeholder="question"
              type="text"
              name="flashcard"
            ></input>
            <input
              className="new deck"
              placeholder="answer"
              type="text"
              name="flashcard"
            ></input>
            <label htmlFor="flashcards">Card 5</label>
            <input
              className="new deck"
              placeholder="question"
              type="text"
              name="flashcard"
            ></input>
            <input
              className="new deck"
              placeholder="answer"
              type="text"
              name="flashcard"
            ></input>
            <button>Submit entire deck</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default AddNewDeck
