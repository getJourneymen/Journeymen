var express = require('express');
var passport = require('passport');
var bodyParser = require('body-parser');
var path = require('path');
var logout = require('express-passport-logout')
// var auth = require('./auth');
var db = require('./db.js');
var util = require('./utilities.js');
var cookieParser = require('cookie-parser');


var app = express();


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
  2. Search Format : req.body --{query: {instrument: string, start: string, end:string}}
  3. Logout
******************************************/

app.get('/',function(req,res){
  res.sendFile(path.resolve(__dirname+'/../client/index.html'));
})

app.get('/search', function(req,res){
 var queryString = req.query;
 console.log('querystring:', queryString);
  return util.searchUsers(queryString)
    .then(function(rows) {
      return res.send(rows);
    });

})

app.get('/logout',function(req,res){
  util.removeAuth(req.user);
  req.logout();
  res.redirect('/');
})

app.get('/avail', ensureAuthenticated, function(req,res){
  return util.getAvail(req.user)
    .then(function(row){
      return res.send(row);
    })
    .catch(function(err){
      console.error(err);
    })
})

/*
*format for 'profile' req body--{profile: {name: string, instrument: array of numbers,avail:}}
*/

app.get('/user', function(req,res){
  //console.log('req.user:', req.user);
  return util.getUser(req.user)
   .then(function(row){
    console.log('row:', row);
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

// app.post('/signup', function(req, res) {
//   util.createUser(req.body)
// })
app.post('/avail', function(req, res) {
  return util.createAvail(req.body)
    .then(function(){
      return res.status(200).send('New availability was created!')
    })
    .catch(function(err){
      return res.status(400).send({err: err});
    })
})

/**********************************
        Update Information
***********************************/

app.put('/user',function(req,res){
  return util.updateUser(req.body)
    .then(function(){
      return res.status(201).send('All updated');
    })
    .catch(function(err){
      return res.status(400).send('Something went wrong');
    })
})

app.put('/avail', function(req, res) {
  return util.updateAvail(req.body)
    .then(function(){
      return res.status(200).send('All updated');
    })
    .catch(function(){
      return res.status(400).send('Something went wrond');
    })
})

/*
*
*logout route
**/

// app.delete('/logout',function(req,res){
//   util.removeUser(req.body.id);
//   res.redirect('/');
// })



/***********************************
          Auth routes
***********************************/

app.get('/auth/soundcloud/callback',
  passport.authenticate('soundcloud',{ successRedirect: '/user', failureRedirect: '/login'}),
  function(req, res){
    //console.log('req.user:', req.user);
    // console.log('req.session.passport.user:', req.session.passport.user);
  //res.redirect('/user');
  });

/**********************************
        middleware auth check
***********************************/

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.status(401).send({err: 'Authentication failed.'})
}

app.listen(8080);
console.log('server is up at 8080')
