
exports.up = function(knex, Promise) {

  return Promise.all([

    //Create Users Table
    knex.schema.createTable('users', function(table) {
      table.increments('id').primary();
      table.string('firstname');
      table.string('lastname');
      table.string('email');
      table.string('instruments');
    }),

    //Create Authentication Table
    knex.schema.createTable('Auth', function(table) {
      table.increments('id').primary();
      table.foreign('user').references('id').inTable('users');
      table.string('token');
      table.string('service');
    }),

    //Create Sessions Table
    knex.schema.createTable('sessions', function(table) {
      table.increments('id').primary();
      table.foreign('user').references('id').inTable('users');
      table.string('jwt');
    }),

    //Create Availability Table
    knex.schema.createTable('availabilty', function(table) {
      table.increments('id').primary();
      table.foreign('user').references('id').inTable('users');
      table.dateTime('start');
      table.dateTime('end');
      table.string('instruments');
    })
    knex('users').insert([{firstname: 'Frankie', lastname:'Vithayathil'},{firstname: 'John', lastname:'Doe'}]);
  ])
};

//Drops Databases Once Server Ends
exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users');
    knex.schema.dropTable('Auth');
    knex.schema.dropTable('sessions');
    knex.schema.dropTable('availabilty');
  ])
};
