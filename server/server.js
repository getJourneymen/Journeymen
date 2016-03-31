var express = require('express');
var http = require('http-request');
var passport = require('passport');
var bodyParser = require('body-parser');
var SoundCloudStrategy = require('passport-soundcloud').Strategy;
var path = require('Path');
var logout = require('express-passport-logout')

//npm install express-passport-logout --save
//


var SOUNDCLOUD_CLIENT_ID ='c9eae4a12b0b429d520addb31b57046f';
var SOUNDCLOUD_CLIENT_SECRET ='8e5da229efe9fed0f350759cb41caab4';

//This is necessary to allow persistent login sessions--
// passport.serializeUser(function(user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function(obj, done) {
//   done(null, obj);
// });

passport.use(new SoundCloudStrategy({
    clientID: SOUNDCLOUD_CLIENT_ID,
    clientSecret: SOUNDCLOUD_CLIENT_SECRET,
    callbackURL: "http://localhost/auth/soundcloud/callback"
  },
    function(accessToken, refreshToken, profile, done) {
    //database function to find user record or create and store record
      User.findOne({ oauthID: profile.id }, function(err, user) {
        if(err) console.log(err); 
        if (!err && user != null) done(null, user);
        else {
         //create user profile and stash in database;
       }
      return done(null, profile);
    });
  }
));

var app = express();


app.configure(function() {
  app.use(express.cookieParser());
  app.use(express.methodOverride());
  app.use(express.session({ secret: 'kitkat' }));
  // Initialize Passport!  Also use passport.session() middleware, to support
  // persistent login sessions (recommended).
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(express.static(__dirname + '/client'));
  app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
  });
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded ({extended:true}));
}  

app.get('/',function(req,res){
  res.sendFile('/index.html')
})

/*
format for 'search' req body--{query:{instrument:,date:,location:}} 
*/

app.get('/search', function(req,res){
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
