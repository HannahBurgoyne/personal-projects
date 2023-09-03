export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('flashcards').del()
  await knex('flashcards').insert([
    { number: 1, question: 'hello', answer: 'bonjour' },
    { number: 2, question: 'goodbye', answer: 'au revoir' },
    { number: 3, question: 'how are you?', answer: 'ca va?' },
    { number: 4, question: 'thank you', answer: 'merci' },
    { number: 5, question: 'excuse me', answer: 'excusez moi' },
  ])

  await knex('joining_table').del()
  await knex('joining_table').insert([
    { id: 1, deck_id: 1, flashcard_id: 1 },
    { id: 2, deck_id: 1, flashcard_id: 2 },
    { id: 3, deck_id: 1, flashcard_id: 3 },
    { id: 4, deck_id: 1, flashcard_id: 4 },
    { id: 5, deck_id: 1, flashcard_id: 5 },
  ])

  await knex('decks').del()
  await knex('decks').insert([
    { id: 1, deck_name: 'Example deck', author: 'Anon' },
  ])
}
