var express = require('express');
var passport = require('passport');
var bodyParser = require('body-parser');
var path = require('Path');
var logout = require('express-passport-logout')
var auth = require('./auth');
var db = require('./db.js');

//npm install express-passport-logout --save
//



var app = express();


app.use(express.static(__dirname + './client'));
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


app.get('/',function(req,res){
  //res.sendFile('/index.html')
  res.send('you did it');
})


app.get('/',function(req,res){
  res.sendFile('/index.html')
})

/*
format for 'search' req body--{query:{instrument:,date:,location:}}
*/

app.get('/search', function(req,res){

	//search database for musicians that fit query

	//database query--

  res.send({response: 'you did it'})
})

/*
format for 'profile' req body--{profile: {name:,instrument:,avail:}}
*/

app.get('/account', ensureAuthenticated, function(req,res){

})

app.put('/account',function(req,res){
  //apply changes to database record
})

app.get('/logout',function(req,res){
  req.logout();
  res.redirect('/');
})


/***********************************
          Auth routes
***********************************/

app.get('/auth/soundcloud/callback',
  passport.authenticate('soundcloud', { failureRedirect: '/login', successRedirect: '/' }),
  function(req, res){
    //stash res token in session db.
    res.redirect('/');
  });

/**********************************
        middleware auth check
***********************************/


//Auth routes

app.get('/auth/soundcloud',
  passport.authenticate('soundcloud'),
  function(req, res){
    // The request will be redirected to SoundCloud for authentication, so this
    // function will not be called.
  });

app.get('/auth/soundcloud/callback',
  passport.authenticate('soundcloud', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

//middleware auth check

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

app.listen(8080);
console.log('server is up at 8080')
