
exports.up = function(knex, Promise) {

  return Promise.all([
    knex.schema.createTable('users', function(table) {
      table.increments('id').primary();
      table.string('firstname');
      table.string('lastname');
      table.string('email');
      table.string('instruments');
    }),
    knex.schema.createTable('Auth', function(table) {
      table.increments('id').primary();
      table.foreign('user').references('id').inTable('users');
      table.string('token');
      table.string('service');
    }),
    knex.schema.createTable('sessions', function(table) {
      table.increments('id').primary();
      table.foreign('user').references('id').inTable('users');
      table.string('jwt');
    }),
    knex.schema.createTable('availabilty', function(table) {
      table.increments('id').primary();
      table.foreign('user').references('id').inTable('users');
      table.dateTime('start');
      table.dateTime('end');
      table.string('instruments');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users');
    knex.schema.dropTable('Auth');
    knex.schema.dropTable('sessions');
    knex.schema.dropTable('availabilty');
  ])
};
