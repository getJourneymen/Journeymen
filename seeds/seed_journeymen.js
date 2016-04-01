
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('Journeymen').del(),

    // Inserts seed entries
    knex('Journeymen').insert({id: 1, firstname: 'John', lastname: 'Doe'}),
    knex('Journeymen').insert({id: 2, firstname: 'Frankie', lastname: 'Vithayathil'}),
    knex('Journeymen').insert({id: 3, firstname: 'Feben', lastname:'Austin'})
  )
};
