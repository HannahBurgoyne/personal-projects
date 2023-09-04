import { useState } from 'react'
import { FlashcardData } from '../../models/models'

interface Props {
  // flipCard: () => void
  currentCard: FlashcardData
}

function Card(props: Props) {
  const [isFlipped, setIsFlipped] = useState(false)
  const { currentCard } = props

  function flipCard() {
    setIsFlipped(!isFlipped)
  }

  return (
    <div className="parent-flashcards-container">
      <div className="deck-container" onClick={flipCard}>
        <div className="deck-content">
          {isFlipped ? currentCard.answer : currentCard.question}
        </div>
      </div>
      <div className="instructions">
        <p>Click on a card to reveal the answer</p>
      </div>
    </div>
  )
}

export default Card
