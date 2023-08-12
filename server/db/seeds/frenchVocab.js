export const seed = async (knex) => {
  // Deletes ALL existing entries
  await knex('frenchVocab').del()

  // Inserts seed entries
  await knex('frenchVocab').insert([
    { question: 'dog', answer: 'un chien' },
    { question: 'cat', answer: 'un chat' },
    { question: 'rabbit', answer: 'un lapin' },
    { question: 'mouse', answer: 'une souris' },
    { question: 'horse', answer: 'un cheval' },
  ])
}
