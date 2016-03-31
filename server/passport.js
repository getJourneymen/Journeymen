var passport = require('passport');
var auth = require('./auth');
var SoundCloudStrategy = require('passport-soundcloud').Strategy;
var session = require('express-session');

module.exports = function(app,express){

app.use(session({
	secret: 'kitkat'
}));


app.use(passport.initialize());

app.use(passport.session());

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

}