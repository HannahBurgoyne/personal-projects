// This contains an edit mode for any deck
// Shows you all the flashcards in your deck, and the option to edit or delete each one

import { useState } from 'react'
import { FlashcardData } from '../../models/models'

interface Props {
  card: FlashcardData
}

function EditCard(props: Props) {
  const [isFlipped, setIsFlipped] = useState(false)

  function flipCard() {
    setIsFlipped(!isFlipped)
  }
  return (
    <div className="parent-flashcards-container">
      <div className="deck-container" onClick={flipCard}>
        <div className="deck-content">
          {isFlipped ? (
            <p className="card-text animate_animated animate__flipInY">
              {props.card.answer}
            </p>
          ) : (
            <p className="card-text">{props.card.question}</p>
          )}
        </div>
      </div>
      <div className="instructions">
        <p>Click on a card to reveal the answer</p>
      </div>
    </div>
  )
}

export default EditCard
