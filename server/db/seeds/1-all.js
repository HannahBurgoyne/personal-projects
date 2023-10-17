export async function seed(knex) {
  await knex('joining_table').del()
  await knex('decks').del()
  await knex('flashcards').del()

  await knex('decks').insert([{ deck_name: 'Example deck', author: 'Anon' }])
  const decksIds = await knex('decks').pluck('id')

  await knex('flashcards').insert([
    { question: 'hello', answer: 'bonjour' },
    { question: 'goodbye', answer: 'au revoir' },
    { question: 'how are you?', answer: 'ca va?' },
    { question: 'thank you', answer: 'merci' },
    { question: 'excuse me', answer: 'excusez moi' },
  ])
  const flashcardIds = await knex('flashcards').pluck('id')

  const joiningTableRecords = flashcardIds.map((flashcardId) => ({
    deck_id: decksIds[0],
    flashcard_id: flashcardId,
  }))

  await knex('joining_table').insert(joiningTableRecords)
}
