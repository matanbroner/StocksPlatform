const passport = require('passport');
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const sequelize = require('sequelize');
const jwt = require("jsonwebtoken");

const Models = require("../models");
const Users = Models.Users;
const { Op } = require("sequelize");

passport.use(new GoogleStrategy({
    clientID:     process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "/oauth/google/login/callback",
    passReqToCallback   : true
  },
  async (request, accessToken, refreshToken, profile, callback) => {

    const { email, provider } = profile;
    const username = profile.id;
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

    var jwtAccessToken = jwt.sign(
      {
          firstName,
          lastName,
          username,
          email,
      },
      process.env.JWT_KEY,
      {
        expiresIn: process.env.JWT_EXPIRES
      }
      
    );
    var jwtRefreshToken = jwt.sign(
        {
            firstName,
            lastName,
            username,
            email,
        },
        process.env.REFRESH_SECRET,
        {
          expiresIn: process.env.REFRESH_EXPIRES
        }
        
    );

    if(!userExists) {
      await Users.create(newUser)
        .then((result) => {
        })
        .catch((err) => console.log(err));

      const oauthDetails = {
        provider,
        accessToken: jwtAccessToken,
        refreshToken: jwtRefreshToken
      }
      
      await Users.update(
        {providers: 
          sequelize.fn('array_append', sequelize.col('providers'), JSON.stringify(oauthDetails))
        },
        { where: { email: email } }
        )
        .then((result) => {
        })
        .catch((err) => console.log(err));
    }

    newUser['accessToken'] = jwtAccessToken;
    newUser['refreshToken'] = jwtRefreshToken;

    return callback(null, newUser); //profile);
  })
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

