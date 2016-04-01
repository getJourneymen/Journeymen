var config      = require('../knexfile.js');
var env         = 'development';
var db          = require('knex')(config[env]);

var util = module.exports;


// get Request Utilities
util.getUser = function(obj) {
  db.select(obj).from("Journeymen")
    .then(function(rows) {
    return rows[0];
    });
}

util.searchUsers = function(obj) {
  return db.from("Availability").join('Journeymen')
    .where('Availability.journeymen_id', '=', 'Journeymen.id')
    .select()
    .where('Availability.instrument','=', 'obj.instrument')
    .andwhere('Availability.start', '<', 'obj.start' )
    .andWhere('Availability.end', '>', 'obj.end');
}







//Post Request Utilities
util.createUser = function(obj) {
  return db('Journeymen').insert(obj);
}












//Put Request Utilities
util.updateUser = function(obj) {
  return db('Journeymen').where({id:obj.id}).update(obj);
}
