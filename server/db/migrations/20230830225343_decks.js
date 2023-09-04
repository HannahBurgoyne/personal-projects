export function up(knex) {
  return knex.schema.createTable('decks', (table) => {
    table.increments('id').primary()
    table.string('deck_name')
    table.string('author')
  })
}

export function down(knex) {
  return knex.schema.dropTable('decks')
}
