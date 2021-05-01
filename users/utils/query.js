const sequelize = require('sequelize');
const { Op } = require("sequelize");
const Models = require('../models');
const Tokens = Models.Tokens;
const Users = Models.Users;
const moment = require('moment');
const jwt = require('jsonwebtoken');

const FORMAT = 'YYYY-MM-DD HH:mm:ss'

/*
 * Check to see if any invalid tokens added to the Table has reached their expiration date.
 * If so, we purge them from the database, as jwt.verify() will be able to flag it as invalid.
 * If not, keep them in the database until they expire to prevent jwt.verify() from granting access.
*/
const removeInvalidTokens = async () => {

  const tokenTime = process.env.JWT_EXPIRES_HOUR;
  const currentTime = moment().format(FORMAT)     // Already UTC?
  const expireTime = moment(currentTime).subtract(tokenTime, 'hours').toDate()

  var numTokensDeleted = await Tokens.destroy({
    where: {
      //Maybe should switch to updatedAt? Depending on if functionality to refresh a token is added
      createdAt: {
        [Op.lte]: expireTime
      }
    }
  });
};

/*
 * Queries the token table to see if a
 * token has been marked as invalid (due to user logout, etc)
*/
const inactiveToken = async (token) => {

  var found = await Tokens.findOne({
      where: {
        token: token,
        valid: false
      }
  });
  return found;
};

/*
*/
const appendProvider = async (email, oauthDetails) => {
  await Users.update(
    {providers: 
      sequelize.fn('array_append', sequelize.col('providers'), JSON.stringify(oauthDetails))
    },
    { where: { email: email } }
    )
    .then((result) => {
    })
    .catch((err) => console.log(err));
};

/*
Pass the refresh token to client, when their access token expires, they will pass that in here.
The refresh token is essentially useless to the client as all the routes require a jwt.verify(accessToken)
refresh token will only be used to say the user logged in validly, so we issue them an access token
*/
const refreshToken = async (refreshToken, callback) => {
  jwt.verify(refreshToken, process.env.REFRESH_SECRET, (error, decodedToken) => {

    if(error) {
      //JsonWebTokenError, TokenExpiredError
      callback(null);
    }
    else {
      
      var { id, username, email } = decodedToken; // Gets decodedToken.email .username .id

      var accessToken = jwt.sign(
        {
          id,
          username,
          email,
        },
        process.env.JWT_KEY,
        {
        expiresIn: process.env.JWT_EXPIRES
        }
      );

      callback(accessToken);
    }

  });
};

module.exports = {
  removeInvalidTokens,
  inactiveToken,
  appendProvider,
  refreshToken
}
