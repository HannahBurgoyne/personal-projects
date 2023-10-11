// This contains the form to add a new deck
// Sits inside the layout, linked from deck library - or nested inside deck library as a toggle component

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Deck, NewDeck } from '../../models/models'
import { addNewDeck } from '../apiClient'
import { Link } from 'react-router-dom'

interface Props {
  total: number | undefined
  showAdd: boolean
}

function AddNewDeck(props: Props) {
  const queryClient = useQueryClient()

  if (props.total) {
    const number = props.total + 1

    const addMutation = useMutation({
      mutationFn: (newDeck: NewDeck) => addNewDeck(number, newDeck),
      onSuccess: () => {
        queryClient.invalidateQueries(['deck'])
      },
    })

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault()

      const target = e.currentTarget
      const form = new FormData(target)

      const deckName = form.get('deckName')?.valueOf() as string
      const deckAuthor = form.get('deckAuthor')?.valueOf() as string
      const flashcard1Question = form.get('flashcard1Q')?.valueOf() as string
      const flashcard1Answer = form.get('flashcard1A')?.valueOf() as string
      const flashcard2Question = form.get('flashcard2Q')?.valueOf() as string
      const flashcard2Answer = form.get('flashcard2A')?.valueOf() as string
      const flashcard3Question = form.get('flashcard3Q')?.valueOf() as string
      const flashcard3Answer = form.get('flashcard3A')?.valueOf() as string
      const flashcard4Question = form.get('flashcard4Q')?.valueOf() as string
      const flashcard4Answer = form.get('flashcard4A')?.valueOf() as string
      const flashcard5Question = form.get('flashcard5Q')?.valueOf() as string
      const flashcard5Answer = form.get('flashcard5A')?.valueOf() as string

      const newDeck: NewDeck = {
        deck_name: deckName,
        author: deckAuthor,
        flashcards: [
          {
            number: 1,
            question: flashcard1Question,
            answer: flashcard1Answer,
          },
          { number: 2, question: flashcard2Question, answer: flashcard2Answer },
          { number: 3, question: flashcard3Question, answer: flashcard3Answer },
          { number: 4, question: flashcard4Question, answer: flashcard4Answer },
          { number: 5, question: flashcard5Question, answer: flashcard5Answer },
        ],
      }

      addMutation.mutate(newDeck)
    }

    return (
      <>
        <div className="addformcontainer">
          <h1>Add new deck</h1>
          <div className="add-form">
            <form onSubmit={handleSubmit}>
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
              <h4 className="form-label">Enter your flashcards</h4>
              <label htmlFor="flashcards">Card 1</label>
              <input
                className="new deck"
                placeholder="question "
                type="text"
                name="flashcard1Q"
              ></input>
              <input
                className="new deck"
                placeholder="answer "
                type="text"
                name="flashcard1A"
              ></input>
              <label htmlFor="flashcards">Card 2</label>
              <input
                className="new deck"
                placeholder="question"
                type="text"
                name="flashcard2Q"
              ></input>
              <input
                className="new deck"
                placeholder="answer"
                type="text"
                name="flashcard2A"
              ></input>
              <label htmlFor="flashcards">Card 3</label>
              <input
                className="new deck"
                placeholder="question"
                type="text"
                name="flashcard3Q"
              ></input>
              <input
                className="new deck"
                placeholder="answer"
                type="text"
                name="flashcard3A"
              ></input>
              <label htmlFor="flashcards">Card 4</label>
              <input
                className="new deck"
                placeholder="question"
                type="text"
                name="flashcard4Q"
              ></input>
              <input
                className="new deck"
                placeholder="answer"
                type="text"
                name="flashcard4A"
              ></input>
              <label htmlFor="flashcards">Card 5</label>
              <input
                className="new deck"
                placeholder="question"
                type="text"
                name="flashcard5Q"
              ></input>
              <input
                className="new deck"
                placeholder="answer"
                type="text"
                name="flashcard5A"
              ></input>
              <button className="form-btn">Submit entire deck</button>
            </form>
          </div>
        </div>
      </>
    )
  }
}

export default AddNewDeck
