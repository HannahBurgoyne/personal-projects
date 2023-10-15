import { useState } from 'react'
import { FlashcardData } from '../../models/models'
import { motion } from 'framer-motion'

interface Props {
  currentCard: FlashcardData
  clickEnabled: boolean
  setClickEnabled: React.Dispatch<React.SetStateAction<boolean>>
  isFlipped: boolean
  setIsFlipped: React.Dispatch<React.SetStateAction<boolean>>
}

function Card(props: Props) {
  const {
    currentCard,
    clickEnabled,
    setClickEnabled,
    isFlipped,
    setIsFlipped,
  } = props

  function flipCard() {
    setIsFlipped(!isFlipped)
    setClickEnabled(false)
  }

  return (
    <div className="parent-flashcards-container">
      <motion.div
        className="deck-container"
        onClick={clickEnabled ? flipCard : () => {}}
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
  )
}

export default Card
