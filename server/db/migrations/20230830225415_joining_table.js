export function up(knex) {
  return knex.schema.createTable('joining_table', (table) => {
    table.increments('id').primary()
    table.string('deck_id').references('decks.id')
    table.string('flashcard_id').references('flashcards.id')
  })
}

export function down(knex) {
  return knex.schema.dropTable('joining_table')
}
