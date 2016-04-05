
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('availability').del(),

    // Inserts seed entries
    knex('availability').insert({user_id: 12345, start:'2016-04-03 20:00:00',end:'2016-04-4 1:00:00', instrument: '[1]'}),
    knex('availability').insert({user_id: 12346, start:'2016-04-05 20:00:00',end:'2016-04-4 1:00:00', instrument: '[1]'}),
    knex('availability').insert({user_id: 12347, start:'2016-04-05 20:00:00',end:'2016-04-4 1:00:00', instrument: '[1,2,3]'})
  );
};
