const passport = require('passport');
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

passport.use(new GoogleStrategy({
    clientID:     process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: "/oauth/login/success",
    passReqToCallback   : true
  },
  (request, accessToken, refreshToken, profile, done) => {
    console.log('Success')
    console.log(profile)

  })
);
