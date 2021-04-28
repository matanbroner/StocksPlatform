const passport = require('passport');
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const sequelize = require('sequelize');

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

    const newUser = {
      email,
      username,
      firstName,
      lastName,
      local: false,
    };

    if(!userExists) {
      await Users.create(newUser)
        .then((result) => {
        })
        .catch((err) => console.log(err));

      const oauthDetails = {
        provider,
        accessToken,
        refreshToken
      }
      await Users.update(
        {providers: 
          sequelize.fn('array_append', sequelize.col('providers'), JSON.stringify(oauthDetails))
        },
        { where: {email: email} }
        )
        .then((result) => {
          console.log(result);
        })
        .catch((err) => console.log(err));
    }

    return callback(null, newUser); //profile);
  })
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

