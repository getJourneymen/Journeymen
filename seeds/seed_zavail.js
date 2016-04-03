
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('Availability').del(),

    // Inserts seed entries
    knex('Availability').insert({journeyman_id: 1, start:'2016-04-3 20:00:00',end:'2016-04-4 1:00:00', instrument: '1'}),
    knex('Availability').insert({journeyman_id: 1, start:'2016-04-5 20:00:00',end:'2016-04-4 1:00:00', instrument: '1'}),
    knex('Availability').insert({journeyman_id: 2, start:'2016-04-5 20:00:00',end:'2016-04-4 1:00:00', instrument: '1'})
  );
};
