import { FlashcardData } from '../../models/models'

interface Props {
  flipCard: () => void
  isFlipped: boolean
  currentCard: FlashcardData
}

function Card(props: Props) {
  const { isFlipped, currentCard, flipCard } = props

  return (
    <div className="parent-flashcards-container">
      <div className="deck-container" onClick={flipCard}>
        <div className="deck-content">
          {isFlipped ? currentCard.answer : currentCard.question}
        </div>
      </div>
      <div className="instructions">
        <p>Click on a card to reveal the answer</p>
        <p>Use the left and right arrow keys to navigate through the cards</p>
      </div>
    </div>
  )
}

export default Card
