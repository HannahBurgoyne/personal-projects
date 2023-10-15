import { useState } from 'react'
import { FlashcardData } from '../../models/models'
import { animate, motion, transform } from 'framer-motion'

interface Props {
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
      <motion.div
        className="deck-container"
        onClick={flipCard}
        initial={{ rotateY: 0 }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="deck-content">
          <motion.div
            className="card-text"
            style={{
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            }}
          >
            {isFlipped ? currentCard.answer : currentCard.question}
          </motion.div>
        </div>
      </motion.div>
      <div className="instructions">
        <p>Click on a card to reveal the answer</p>
      </div>
    </div>
    // <div className="parent-flashcards-container">
    //   <div className="deck-container" onClick={flipCard}>
    //     <div className="deck-content">
    //       {isFlipped ? (
    //         <p className="card-text animate_animated animate__flipInY">
    //           {currentCard.answer}
    //         </p>
    //       ) : (
    //         <p className="card-text">{currentCard.question}</p>
    //       )}
    //     </div>
    //   </div>
    //   <div className="instructions">
    //     <p>Click on a card to reveal the answer</p>
    //   </div>
    // </div>
  )
}

export default Card
