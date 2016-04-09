var passport = require('passport');
var auth = require('./auth');
var SoundCloudStrategy = require('passport-soundcloud').Strategy;
var session = require('express-session');
var util = require('./utilities');
var cookieParser = require('cookie-parser');

module.exports = function(app,express){

app.use(session({
  secret: 'kitkat', 
}));


app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser('kitkat'));

/**
** serialize/deserialize are the gears of passport sessions.
** As long as the soundcloud_id returns a profile from the DB,
** the session persists. If it doesn't, middleware auth check
** isAuthenticated() catches it responds with 401.
**/

/*Sets req.session.passport.user to user.soundcloud_id
  user.soundcloud_id is also the id passed to deserialize*/

passport.serializeUser(function(user, done){
  console.log(user);
  done(null, user.soundcloud_id);
});

/*Retrieves the full profile from DB and
  sets req.user to full DB profile*/

passport.deserializeUser(function(id, done) {

  console.log('deserial Obj:', id);

  return util.getUser({soundcloud_id:id})
        .then(function(user){
          console.log(user);
          return done(null,user);
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
      function(accessToken, params, refreshToken, profile, done){

        //console.log('accessToken:', accessToken)
        //console.log(profile)

        //checks DB for user profile--if non-existant,
        //creates and stores in DB lines 56-70
            return util.getUser({soundcloud_id:profile.id})
              .then(function(user){

                if(user){
                  return done(null,user);
                }else{

                  var userProfile = {
                    soundcloud_id: profile.id,
                    username     : profile._json.username,
                    first_name   : profile._json.first_name,
                    last_name    : profile._json.last_name,
                    email        : '',
                    instrument   : '',
                    description  : '',
                    img_url      : profile._json.avatar_url
                  }
                    return util.createUser(userProfile)
                    .then(function(data){
                      userProfile.id = data[0]
                        return util.addAuth({user_id: data[0], auth_token: accessToken})
                      .then(function(){
                        return done(null,userProfile);
                      })
                    })
                  }
                })
    }))
};