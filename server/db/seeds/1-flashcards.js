export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('flashcards').del()
  await knex('flashcards').insert([
    { id: 1, question: 'hello', answer: 'bonjour' },
    { id: 2, question: 'goodbye', answer: 'au revoir' },
    { id: 3, question: 'how are you?', answer: 'ca va?' },
    { id: 4, question: 'thank you', answer: 'merci' },
    { id: 5, question: 'excuse me', answer: 'excusez moi' },
  ])
}
