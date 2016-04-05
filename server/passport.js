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

passport.serializeUser(function(user, done){
//return something from the user--maybe id.
  done(null, user.id);
});

passport.deserializeUser(function(obj, done) {

  util.getUser(obj)
  .then(function(user){
    done(null,user);
  })
  .catch(function(err){
    console.error(err)
  })
});

passport.use(new SoundCloudStrategy({
    clientID: auth.soundCloud_id,
    clientSecret:auth.soundCloud_secret,
    callbackURL: "http://127.0.0.1:8080/auth/soundcloud/callback"
  },
    function(accessToken, refreshToken, params, profile, done) {
    
    db('Auth').insert({id: profile.id, auth_token: accessToken});
    
    util.getUser({id:profile.id})
    .then(function(user){
      done(null,user);
    })
    .catch(function(err){
      var user = {
        soundcloud_id: profile.id,
        first_name: profile.firstname,
        last_name: profile.lastname,
        email: null,
        instrument: null,
        description: null,
        img_url: profile.img_url
      }
      done(null,user);
    })
   }));
};
