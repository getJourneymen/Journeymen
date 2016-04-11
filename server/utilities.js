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

util.getUserByUsername = function(username) {
  return db.select().from("journeymen")
        .where('username', '=', username)
        .then(function(rows) {
        return rows[0];
        });
}

util.getUserBySoundcloud = function(soundcloud_id) {
  return db.select().from("journeymen")
        .where('soundcloud_id', '=', soundcloud_id)
        .then(function(rows) {
        return rows[0];
        });
}


util.getAvail = function(reqObj){
  return db.select().from('availability')
        .where('user_id','=', reqObj.id)
        .then(function(row){
        return row;
        })
}

util.getSession = function(sessid){
  return db.select().from('session')
        .where('sid', '=', sessid)
        .then(function(row){
         if(row[0]){
          return row[0].sid;
         }else{
          return null;
         }
        })
}

util.searchUsers = function(reqObj) {
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
  return db().insert(reqObj).returning('id').into('journeymen');
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

util.updateUser = function(userObj){
  var id = userObj.id;
  delete userObj.id;
  return db('journeymen')
        .where('id', '=', id)
        .update(userObj);
}

util.updateAvail = function(reqObj){
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

util.addAuth = function(obj){
  return db('auth').insert(obj);
}

util.removeAuth = function(reqObj){
  return db('auth')
        .where('user_id','=', reqObj.id)
        .del();
}

