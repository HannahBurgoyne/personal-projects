export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('decks').insert([
    { id: 1, deck_name: 'Example deck', author: 'Anon' },
  ])
}
