// This contains an edit mode for any deck
// Shows you all the flashcards in your deck, and the option to edit or delete each one

import { useState } from 'react'
import { FlashcardData } from '../../models/models'

interface Props {
  card: FlashcardData
}

function EditCard(props: Props) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  function flipCard() {
    setIsFlipped(!isFlipped)
  }

  function editCard() {
    setIsEditing(!isEditing)
  }

  function handleFormSubmit() {}

  return (
    <div className="edit-flashcards-container">
      <div className="deck-container" onClick={flipCard}>
        <form onSubmit={handleFormSubmit} className="edit-card-form">
          <input
            type="text"
            name="flashcard"
            placeholder={props.card.question}
          />
          <input type="text" name="flashcard" placeholder={props.card.answer} />
          <button>Save</button>
        </form>

        {/* 
          {isFlipped ? (
            <p className="card-text animate_animated animate__flipInY">
              {props.card.answer}
            </p>
          ) : (
            <p className="card-text">{props.card.question}</p>
          )}
          {isEditing ? <p>Edit mode</p> : <p>not edit mode</p>} */}
      </div>
    </div>
  )
}

export default EditCard
