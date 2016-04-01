var passport = require('passport');
var auth = require('./auth');
var SoundCloudStrategy = require('passport-soundcloud').Strategy;
var session = require('express-session');
var util = require('./utilities');

module.exports = function(app,express){

app.use(session({
	secret: 'kitkat'
}));


app.use(passport.initialize());

app.use(passport.session());

var user = {};

passport.serializeUser(function(user, done){
//return something from the user--maybe id.
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
//db function to remove user from DB
  done(null, obj);
});

passport.use(new SoundCloudStrategy({
    clientID: auth.soundCloud_id,
    clientSecret:auth.soundCloud_secret,
    callbackURL: "http://127.0.0.1:8080/auth/soundcloud/callback"
  },
    function(accessToken, refreshToken, params, profile, done) {
     console.log('accessToken:', accessToken);
     console.log('refreshToken:', refreshToken);
     console.log('params:', params);
     user.access = params.accessToken;
     user.name = profile.full_name;
     return done(null,user);
   }));
};
