export function up(knex) {
  return knex.schema.createTable('frenchVocab', (table) => {
    table.increments('id').primary()
    table.string('question')
    table.string('answer')
  })
}

export function down(knex) {
  return knex.schema.dropTable('frenchVocab')
}
