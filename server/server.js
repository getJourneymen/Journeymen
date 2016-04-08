var express = require('express');
var passport = require('passport');
var bodyParser = require('body-parser');
var path = require('path');
var logout = require('express-passport-logout');
//var auth = require('./auth.js');
var db = require('./db.js');
var util = require('./utilities.js');
var cookieParser = require('cookie-parser');


var app = express();

var httpPort = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname+'/../client')));
app.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
next();
});

app.use(cookieParser('kitkat'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded ({extended:true}));

//configAuth--sets up passport sessions--function in passport.js

var configAuth = require('./passport')(app,express);

/********************************
        app endpoint routes
*********************************/

app.get('/login', passport.authenticate('soundcloud'));

/*****************************************
            Get Requests
  1. Serve index.html
  2. Search Format -- In Angular, build up a query string
     by setting the params property in the $http config object
     Ex. $http({
          method: 'GET',
          url   : '/search',
          params: {instrument: [1], start: 'timestamp', end: 'timestamp'})
        })
  3. Getting /avail and /user doesn't need querystring because req.body
     will have been set by passport deserialize. We match with req.user.id
  4. Logout
******************************************/

app.get('/',function(req,res){
  res.sendFile(path.resolve(__dirname+'/../client/index.html'));
})

app.get('/search', function(req,res){
  var queryString = req.query;
 //console.log('querystring:', queryString);
  return util.searchUsers(queryString)
  .then(function(rows) {
    return res.send(rows);
  });
})

app.get('/avail', function(req,res){
  return util.getAvail(req.user)
  .then(function(row){
    return res.send(row);
  })
  .catch(function(err){
    console.error(err);
  })
})

app.get('/user', function(req,res){
  // console.log('req.user:', req.user);
    return util.getUserByUsername(req.query.username)
      .then(function(row){
        console.log('user data retreived row:', row, req.query);
        return res.send(row);
      })
    .catch(function(err){
      console.error(err)
    })
})

app.get('/user/me', ensureAuthenticated, function(req,res){
  console.log('req.user:', req.user);
    return util.getUser(req.user)
      .then(function(row){
        console.log('user data retreived row:', row);
        return res.send(row);
      })
    .catch(function(err){
      console.error(err)
    })
})

/**********************************
        Post Requests
1. New User Format should be req.body ----{user:{firstname: string,
   lastname: string, email: string, instrument: string}}
2. New Availability Format should be req.body ----{time:{auth_token: integer,
   start: DateTime, end: DateTime, instrument: string }}
**********************************/

app.post('/avail', function(req, res) {
  return util.createAvail(req.body)
  .then(function(){
    return res.status(200).send('New availability was created!');
  })
  .catch(function(err){
    return res.status(400).send({err: err});
  })
})

/*********************************************
    Update/Remove Information--PUT & DELETE
**********************************************/

app.put('/user', function(req,res){
  return util.updateUser(req.body)
  .then(function(){
    return res.status(200).send(req.body);
  })
  .catch(function(err){
    return res.status(400).send('Something went wrong:', err);
  })
})

app.put('/avail', function(req, res){
  return util.updateAvail(req.body)
  .then(function(){
    return res.status(200).send('All updated');
  })
  .catch(function(err){
    return res.status(400).send(err);
  })
})

app.delete('/avail', function(req,res){
  return util.removeAvail(req.body)
  .then(function(){
    return res.status(200).send('All updated')
  })
  .catch(function(err){
    return res.status(400).send(err)
  })
})

app.get('/logout', ensureAuthenticated, function(req,res){
  return util.removeAuth(req.user)
  .then(function(){
    return req.logout();
  })
  .then(function(){
    return res.redirect('/');
  })
  .catch(function(err){
    console.log("An error occurred on logout: ", err);
  })
})

/***********************************
          Auth Callback
***********************************/

app.get('/auth/soundcloud/callback',
  passport.authenticate('soundcloud',{ successRedirect: '/', failureRedirect: '/'}),
  function(req, res){
    //console.log('req.user:', req.user);
    // console.log('req.session.passport.user:', req.session.passport.user);
  //res.redirect('/user');
  })

/**********************************
        Middleware Auth Check
***********************************/

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.status(401).send({err: 'Authentication failed.'})
}

app.listen(httpPort);
console.log('server is up at ', httpPort)
