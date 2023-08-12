export const seed = async (knex) => {
  // Deletes ALL existing entries
  await knex('dogTricks').del()

  // Inserts seed entries
  await knex('dogTricks').insert([
    { question: 'paw', answer: 'dog offers each paw to owner' },
    { question: 'spin', answer: 'dog spins clockwise and counter-clockwise' },
    { question: 'rollover', answer: 'dog rolls over both ways' },
    {
      question: 'shake',
      answer: 'dog offers each paw and lets each be shaken',
    },
    { question: 'weave', answer: "dog weaves through owner's legs" },
  ])
}
