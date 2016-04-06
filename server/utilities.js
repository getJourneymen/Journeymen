var config      = require('../knexfile.js');
var env         = 'development';
var db          = require('knex')(config[env]);

var util = module.exports;

// get Request Utilities
util.getUser = function(obj) {
return db.select().from("journeymen")
    .where('soundcloud_id', '=', obj.soundcloud_id)
    .then(function(rows) {
    return rows[0];
    });
}

util.getAvail = function(obj){
  return db.select().from('availability')
         .where('user_id', '=', obj.soundcloud_id)
         .then(function(row){
          return row;
         })
}

util.searchUsers = function(obj) {
  console.log('obj:', obj.start);
  return db.from('availability')
    .innerJoin('journeymen','soundcloud_id', 'availability.user_id')
    .where('availability.instrument','=', obj.instrument)
    .andWhere('availability.start', '<=', obj.start)
    .andWhere('availability.end', '>=', obj.end)
    .select();
}


//Post Request Utilities
util.createUser = function(obj) {
  return db('journeymen').insert(obj);
}

util.createSession = function(obj) {
  return db('sessions').insert(obj);
}

util.createAvail = function(obj) {
  return db('availability').insert(obj)
}

//Put Request Utilities
util.updateUser = function(obj) {
  return db('journeymen')
         .where('soundcloud_id', '=', obj.soundcloud_id).update(obj);
}

util.updateAvail = function(obj){
  return db('availability')
         .where('id', '=', obj.id).update(obj);
}


//Auth table Utilities

util.addAuth = function(obj){
  db('auth').insert(obj);
}

util.removeAuth = function(obj){
  db('auth').where('user_id','=', obj.soundcloud_id).del();
}