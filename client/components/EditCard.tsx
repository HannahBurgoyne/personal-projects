// This contains an edit mode for any deck
// Shows you all the flashcards in your deck, and the option to edit or delete each one

import React, { useState } from 'react'
import { FlashcardData, FlashcardInfo, NewFlashcard } from '../../models/models'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { deleteCard, updateFlashcard } from '../apiClient.tsx'

interface Props {
  card: FlashcardData
}

function EditCard(props: Props) {
  const queryClient = useQueryClient()

  const updateMutation = useMutation({
    mutationFn: (flashcardData: FlashcardData) =>
      updateFlashcard(flashcardData),
    onSuccess: () => {
      queryClient.invalidateQueries(['flashcards'])
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (flashcardData: FlashcardInfo) => deleteCard(flashcardData),
    onSuccess: () => {
      queryClient.invalidateQueries(['flashcards'])
    },
  })

  function handleDelClick(
    e: React.MouseEvent<HTMLButtonElement>,
    flashcardId: number
  ) {
    console.log('del called')
    e.preventDefault()
    const deckId = props.card.deckId
    const data: FlashcardInfo = {
      deckId: deckId,
      flashcardId: flashcardId,
    }
    deleteMutation.mutate(data)
  }

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const target = e.currentTarget
    const form = new FormData(target)

    const updatedQuestion = form.get('flashcard-q')?.valueOf() as string
    const updatedAnswer = form.get('flashcard-a')?.valueOf() as string

    const updatedCard = {
      flashcardId: props.card.flashcardId,
      deckId: props.card.deckId,
      number: props.card.number,
      question: updatedQuestion,
      answer: updatedAnswer,
    }

    updateMutation.mutate(updatedCard)
  }

  return (
    <div className="edit-flashcards-container">
      <div className="deck-container edit">
        <form onSubmit={handleFormSubmit} className="edit-card-form">
          <input
            type="text"
            name="flashcard-q"
            className="edit-form-input"
            placeholder={props.card.question}
          />
          <input
            type="text"
            name="flashcard-a"
            className="edit-form-input"
            placeholder={props.card.answer}
          />
          <button className="save-button">Save</button>
        </form>
        <button onClick={(e) => handleDelClick(e, props.card.flashcardId)}>
          Delete
        </button>
      </div>
    </div>
  )
}

export default EditCard
