
exports.up = function(knex, Promise) {

  return Promise.all([

    //Create Users Table
    knex.schema.createTable('journeymen', function(table) {
      table.increments('id').primary();
      table.integer('soundcloud_id').unique;
      table.string('username');
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
      table.integer('user_id').references('id').inTable('journeymen');
      table.string('auth_token');
    }),

    //Create Sessions Table
    knex.schema.createTable('session', function(table) {
      table.increments('id').primary();
      table.string('sess');
      table.string('sid');
      table.timestamp('expire');
    }),

    //Create Availability Table
    knex.schema.createTable('availability', function(table) {
      table.increments('id').primary();
      table.integer('user_id').references('id').inTable('journeymen');
      table.dateTime('start');
      table.dateTime('end');
      table.string('instrument');
    })
  ])
}

//Drops Databases Once Server Ends
exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('journeymen'),
    knex.schema.dropTable('auth'),
    knex.schema.dropTable('session'),
    knex.schema.dropTable('availability')
  ])
}






