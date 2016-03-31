var express = require('express');
var passport = require('passport');
var bodyParser = require('body-parser');
var SoundCloudStrategy = require('passport-soundcloud').Strategy;
var path = require('Path');
var logout = require('express-passport-logout')
var auth = require('auth');
//var db = require('db');




//This is necessary to allow persistent login sessions--'remember me'
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new SoundCloudStrategy({
    clientID: auth.soundCloud_id;
    clientSecret:auth.soundCloud_secret,
    callbackURL: "http://localhost/auth/soundcloud/callback"
  },
    function(accessToken, refreshToken, profile, done) {
    //database function to find user record or create and store record
      User.findOrCreate({ oauthID: profile.id }, function(err, user) {
        if(err) console.log(err); 
        if (!err && user != null) done(null, user);
        else {
          var user = new User()
         //create user profile and stash in database;
       }
      return done(null,user);
    });
  }));

var app = express();


app.use(express.cookieParser());
app.use(express.methodOverride());
app.use(express.session({ secret: 'kitkat' }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).


app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/client'));
app.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded ({extended:true}));

/********************************
        app endpoint routes
*********************************/
app.get('/login',function(req,res){
  passport.authenticate('soundcloud'),
   function(req, res){
    // The request will be redirected to SoundCloud for authentication, so this
    // function will not be called.
  }
})


app.get('/',function(req,res){
  //res.sendFile('/index.html')
  res.send('you did it');
})

/*
format for 'search' req body--{query:{instrument:,date:,location:}} 
*/

app.get('/search', function(req,res){
	//search database for musicians that fit query
  res.send({response: 'you did it'})
})

/*
format for 'profile' req body--{profile: {name:,instrument:,avail:}}
*/

app.get('/account', ensureAuthenticated, function(req,res){
  //find record in database and serve
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
  passport.authenticate('soundcloud', { failureRedirect: '/login' }),
  function(req, res){
    //stash res token in session db.
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
