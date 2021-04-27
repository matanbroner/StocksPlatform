const passport = require('passport');
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

const Models = require("../models");
const OAuths = Models.OAuths;
const { Op } = require("sequelize");

passport.use(new GoogleStrategy({
    clientID:     process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "/oauth/login/success",
    passReqToCallback   : true
  },
  async (request, accessToken, refreshToken, profile, callback) => {

    const { id, email, provider } = profile;
    const username = profile.displayName;
    const firstName = profile.given_name;
    const lastName = profile.family_name;

    var userExists = await OAuths.findOne({
      where: {
        [Op.or]: [
          {
            id,
            email
          },
        ],
      },
    });

    const newUser = {
      id: id,
      email: email,
      provider: provider,
      username: username,
      firstName: firstName,
      lastName: lastName
    };

    if(!userExists) {
      await OAuths.create(newUser)
        .then((result) => {
          console.log('User has been entered in OAuth database');
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
