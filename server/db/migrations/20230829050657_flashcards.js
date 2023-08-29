export function up(knex) {
  return knex.schema.createTable('flashcards', (table) => {
    table.increments('id').primary()
    table.string('question')
    table.string('answer')
  })
}

export function down(knex) {
  return knex.schema.dropTable('decks')
}
