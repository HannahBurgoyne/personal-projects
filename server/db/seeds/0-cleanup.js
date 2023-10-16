export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('joining_table').del()
  await knex('decks').del()
  await knex('flashcards').del()
}
