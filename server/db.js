//These three requires give us access to the knex library and create the database connection
var config      = require('../knexfile.js');
var env         = 'development';
var knex          = require('knex')(config[env]);

module.exports = knex;

knex.migrate.latest([config]);

exports.fetchUser = function(obj) {
  var user = db.select().from("Journeymen")
    .then(function(rows) {
    console.log("user data: ", rows);
    })
}
