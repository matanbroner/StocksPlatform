const passport = require('passport');
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

const Models = require("../models");
const Users = Models.Users;
const { Op } = require("sequelize");

const QueryModule = require("../utils/query");
const HelperModule = require("../utils/helper");

passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/oauth/google/login/callback",
    passReqToCallback   : true
  },
  async (request, accessToken, refreshToken, profile, callback) => {

    const { email, provider } = profile;
    const username = profile.email;
    const firstName = profile.given_name;
    const lastName = profile.family_name;

    var userExists = await Users.findOne({
      where: {
        [Op.or]: [
          {
            email
          },
        ],
      },
    });

    var newUser = {
      email,
      username,
      firstName,
      lastName,
      local: false,
    };

    var jwtAccessToken = await HelperModule.createAccessToken(newUser);

    var jwtRefreshToken = await HelperModule.createRefreshToken(newUser);

    const oauthDetails = {
      provider,
      accessToken: jwtAccessToken,
      refreshToken: jwtRefreshToken
    }

    if(!userExists) {
      await Users.create(newUser)
        .then((result) => {
        })
        .catch((err) => console.log(err));
      
      await QueryModule.appendProvider(email, oauthDetails);
    }

    else{
      var userProviders = userExists.providers;
      var registered = false;

      // Check if the OAuth has already been associated with the user
      for(var index = 0; index < userProviders.length; index++) {
        if(userProviders[index].provider === 'google') {
          registered = true;
          break;
        }
      }

      if(!registered) {
        await QueryModule.appendProvider(email, oauthDetails);
      }

    }

    newUser['accessToken'] = jwtAccessToken;
    newUser['refreshToken'] = jwtRefreshToken;

    return callback(null, newUser); //profile);
  })
);

passport.use(new FacebookStrategy({
  clientID:     process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: "/oauth/facebook/login/callback",
  passReqToCallback   : true,
  profileFields: ['id', 'emails', 'name']
},
  async (request, accessToken, refreshToken, profile, callback) => {
    
    const { email } = profile._json;
    const { provider } = profile;
    const username = profile._json.email;
    const firstName = profile._json.first_name;
    const lastName = profile._json.last_name;

    var userExists = await Users.findOne({
      where: {
        [Op.or]: [
          {
            email
          },
        ],
      },
    });

    var newUser = {
      email,
      username,
      firstName,
      lastName,
      local: false,
    };

    var jwtAccessToken = await HelperModule.createAccessToken(newUser);

    var jwtRefreshToken = await HelperModule.createRefreshToken(newUser);

    const oauthDetails = {
      provider,
      accessToken: jwtAccessToken,
      refreshToken: jwtRefreshToken
    }

    if(!userExists) {
      await Users.create(newUser)
        .then((result) => {
        })
        .catch((err) => console.log(err));
      
      await QueryModule.appendProvider(email, oauthDetails);
    }

    else{
      var userProviders = userExists.providers;
      var registered = false;
      
      // Check if the OAuth has already been associated with the user
      for(var index = 0; index < userProviders.length; index++) {
        if(userProviders[index].provider === 'facebook') {
          registered = true;
          break;
        }
      }

      if(!registered) {
        await QueryModule.appendProvider(email, oauthDetails);
      }

    }

    newUser['accessToken'] = jwtAccessToken;
    newUser['refreshToken'] = jwtRefreshToken;

    return callback(null, newUser);
  })
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

