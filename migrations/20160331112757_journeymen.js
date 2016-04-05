
exports.up = function(knex, Promise) {

  return Promise.all([

    //Create Users Table
    knex.schema.createTable('journeymen', function(table) {
      table.increments('id').primary();
      table.integer('soundcloud_id').unique();
      table.string('first_name');
      table.string('last_name');
      table.string('email');
      table.string('instrument');
      table.string('description');
      table.string('img_url');
    }),


    //Create Authentication Table
    knex.schema.createTable('auth', function(table) {
      table.increments('id').primary();
      table.integer('user_id').references('soundcloud_id').inTable('journeymen');
      table.string('auth_token');
      table.string('service');
    }),

    //Create Sessions Table
    knex.schema.createTable('sessions', function(table) {
      table.increments('id').primary();
      table.integer('user_id').references('soundcloud_id').inTable('journeymen');
      table.string('session_token');
    }),

    //Create Availability Table
    knex.schema.createTable('availability', function(table) {
      table.increments('id').primary();
      table.integer('user_id').references('soundcloud_id').inTable('journeymen');
      table.timestamp('start');
      table.timestamp('end');
      table.string('instrument');
    })
  ])
}

//Drops Databases Once Server Ends
exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('journeymen'),
    knex.schema.dropTable('auth'),
    knex.schema.dropTable('sessions'),
    knex.schema.dropTable('availability')
  ])
}
