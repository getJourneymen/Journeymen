
exports.up = function(knex, Promise) {

  return Promise.all([

    //Create Users Table
    knex.schema.createTable('Journeymen', function(table) {
      table.increments('id').primary();
      table.string('soundcloud_id');
      table.string('firstname');
      table.string('lastname');
      table.string('email');
      table.string('instrument');
    }),


    //Create Authentication Table
    knex.schema.createTable('Auth', function(table) {
      table.increments('id').primary();
      table.integer('journeyman_id').references('id').inTable('Journeymen');
      table.string('token');
      table.string('service');
    }),

    //Create Sessions Table
    knex.schema.createTable('Sessions', function(table) {
      table.increments('id').primary();
      table.integer('journeyman_id').references('id').inTable('Journeymen');
      table.string('session_token');
    }),

    //Create Availability Table
    knex.schema.createTable('Availabilty', function(table) {
      table.increments('id').primary();
      table.integer('journeyman_id').references('id').inTable('Journeymen');
      table.dateTime('start');
      table.dateTime('end');
      table.string('instrument');
    })
  ])
}

//Drops Databases Once Server Ends
exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('Journeymen'),
    knex.schema.dropTable('Auth'),
    knex.schema.dropTable('Sessions'),
    knex.schema.dropTable('Availabilty')
  ])
}
