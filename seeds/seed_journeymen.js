
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('Journeymen').del(),

    // Inserts seed entries
    knex('Journeymen').insert({soundcloud_id: 1, firstname: 'John', lastname: 'Doe'}),
    knex('Journeymen').insert({id: 2, firstname: 'Frankie', lastname: 'Vithayathil'}),
    knex('Journeymen').insert({id: 3, firstname: 'Feben', lastname:'Austin'}),

    knex('Availability').insert({journey_id: 1, start:'2016-04-3 20:00:00',end:'2016-04-4 1:00:00', instrument: '1'}),
    knex('Availability').insert({journey_id: 1, start:'2016-04-5 20:00:00',end:'2016-04-4 1:00:00', instrument: '1'}),
    knex('Availability').insert({journey_id: 2, start:'2016-04-5 20:00:00',end:'2016-04-4 1:00:00', instrument: '1'})
  )
};
