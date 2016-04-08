var config      = require('../knexfile.js');
var env         = 'development';
var db          = require('knex')(config[env]);

var util = module.exports;


/*************************
  GET Request Utilities
*************************/

util.getUser = function(reqObj) {
  return db.select().from("journeymen")
         .where('soundcloud_id', '=', reqObj.soundcloud_id)
         .then(function(rows) {
         return rows[0];
     });
    }

util.getAvail = function(reqObj){
  return db.select().from('availability')
        .where('user_id', '=', reqObj.id)
        .then(function(row){
        return row;
        })
}

util.searchUsers = function(reqObj) {
  console.log(reqObj);
  return db.select().from('availability')
        .innerJoin('journeymen', 'user_id', 'journeymen.id')
        .where('availability.instrument','=', reqObj.instrument)
        .andWhere('availability.start', '<=', reqObj.start)
        .andWhere('availability.end', '>=', reqObj.end)
        .then(function(row){
        console.log('row:', row);
          return row;
        })
       
}

/*************************
  POST Request Utilities
**************************/

util.createUser = function(reqObj){
  return db('journeymen').insert(reqObj);
}

util.createSession = function(reqObj){
  return db('sessions').insert(reqObj);
}

util.createAvail = function(reqObj){
  return db('availability').insert(reqObj)
}

/**************************
   PUT Request Utilities
***************************/

util.updateUser = function(reqObj){
  return db('journeymen')
        .where('id', '=', reqObj.id)
        .update(reqObj);
}

util.updateAvail = function(reqObj){
  console.log(reqObj);
  return db('availability')
        .where('id', '=', reqObj.id)
        .update(reqObj);
}

/*************************
  DELETE Request Utilities
**************************/

util.removeAvail = function(reqObj){
  return db('availability')
        .where('id', '=', reqObj.id)
        .del();

}

/*************************
   Auth Table Utilities
**************************/

util.addAuth = function(reqObj){
  return db('auth').insert(reqObj);
}

util.removeAuth = function(reqObj){
  return db('auth')
        .where('user_id','=', reqObj.soundcloud_id)
        .del();
}