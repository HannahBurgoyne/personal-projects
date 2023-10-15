export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('joining_table').del()
  await knex('joining_table').insert([
    { id: 1, deck_id: 1, flashcard_id: 1 },
    { id: 2, deck_id: 1, flashcard_id: 2 },
    { id: 3, deck_id: 1, flashcard_id: 3 },
    { id: 4, deck_id: 1, flashcard_id: 4 },
    { id: 5, deck_id: 1, flashcard_id: 5 },
  ])
}
