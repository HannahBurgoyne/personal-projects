export function up(knex) {
  return knex.schema.createTable('joining_table', (table) => {
    table.increments('id').primary()
    table.integer('deck_id').references('decks.id')
    table.integer('flashcard_id').references('flashcards.id')
  })
}

export function down(knex) {
  return knex.schema.dropTable('joining_table')
}
