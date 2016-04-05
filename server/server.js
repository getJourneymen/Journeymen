var express = require('express');
var passport = require('passport');
var bodyParser = require('body-parser');
var path = require('path');
var logout = require('express-passport-logout')
// var auth = require('./auth');
var db = require('./db.js');
var util = require('./utilities.js');
var qs = require('qs');

//npm install express-passport-logout --save

var app = express();


app.use(express.static(path.join(__dirname+'/../client')));
app.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded ({extended:true}));

var configAuth = require('./passport')(app,express);

/********************************
        app endpoint routes
*********************************/
app.get('/login', passport.authenticate('soundcloud'));

/*****************************************
            Get Requests
  1. Serve index.html
  2. Search Format : req.body --{query: {instrument: string, date: string, location:string}}
  3. Logout
******************************************/
app.get('/',function(req,res){
  res.sendFile(path.resolve(__dirname+'/../client/index.html'));
})

app.get('/search', function(req,res){
 var queryString = req.query;
 console.log('querystring:', queryString);
  util.searchUsers(queryString)
    .then(function(rows) {
      res.send(rows);
    });

})

app.get('/logout',function(req,res){
  req.logout();
  res.redirect('/');
})

app.get('/avail', ensureAuthenticated, function(req,res){
  //db function to get avail of user;
})

/*
format for 'profile' req body--{profile: {name:,instrument:,avail:}}
*/

app.get('/user', function(req,res){
  var queryString = req.query;
  console.log('querystring:', queryString);
   return util.getUser(queryString)
   .then(function(row){
     res.send(row);
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

app.post('/signup', function(req, res) {
  util.createUser(req.body)
})
app.post('/avail', function(req, res) {
  util.createAvail(req.body)
})








/**********************************
  Update Information
***********************************/
app.put('/user',function(req,res){
  util.updateUser(req.body)
    .then(function(something) {
      console.log('whatever update query returns:', something);
    })
})
app.put('/avail', function(req, res) {
  util.updateAvail(req.body)
})

/****
logout route
******/

app.delete('/logout',function(req,res){
  util.removeUser(req.body.id);
  req.user = null;
  req.passport.session.user = null;
  res.redirect('/');
})



/***********************************
          Auth routes
***********************************/

app.get('/auth/soundcloud/callback',
  passport.authenticate('soundcloud', { failureRedirect: '/login', successRedirect: '/' }),
  function(req, res){
    console.log('req.body:', req.body);
    console.log('req.user:', req.user);
    console.log('req.passport.session.user:', req.passport.session.user);
    res.send()
    res.redirect('/');
  });

/**********************************
        middleware auth check
***********************************/

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

app.listen(8080);
console.log('server is up at 8080')
