var passport = require('passport');
var auth = require('./auth');
var SoundCloudStrategy = require('passport-soundcloud').Strategy;
var session = require('express-session');
var util = require('./utilities');
var cookieParser = require('cookie-parser');

module.exports = function(app,express){

app.use(session({
	secret: 'kitkat'
}));


app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser('kitkat'));

passport.serializeUser(function(user, done){

  done(null, user.soundcloud_id);
});

passport.deserializeUser(function(obj, done) {

  console.log('deserial Obj:', obj);

  return util.getUser({id:obj})
  .then(function(user){
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
    function(accessToken, params, refreshToken, profile, done) {
    
    //db('Auth').insert({id: profile.id, auth_token: accessToken});
    //console.log('accessToken:', accessToken)
    //console.log(profile)
    return util.getUser({id:profile.id})
    .then(function(user){
      if(user){
      // console.log('user:', user);
      // console.log('in then')
      return done(null,user);
     }else{
      // console.log('making user')
      
      var userProfile = {
                        'soundcloud_id': profile.id,
                        'first_name': profile._json.first_name,
                        'last_name': profile._json.last_name,
                        'email': '',
                        'instrument': '',
                        'description': '',
                        'img_url': profile._json.avatar_url
                        }
      // console.log(userProfile);
      
      util.createUser(userProfile)
      .then(function(){
        return done(null,userProfile);
      })
     }
    })
   }));
};
