const { sequelize } = require('../models');
const { Op } = require("sequelize");
const Models = require('../models');
const Tokens = Models.Tokens;
const moment = require('moment');

/*
 * Check to see if any invalid tokens added to the Table has reached their expiration date.
 * If so, we purge them from the database, as jwt.verify() will be able to flag it as invalid.
 * If not, keep them in the database until they expire to prevent jwt.verify() from granting access.
*/
const removeTokens = async () => {

  const tokenTime = process.env.tokenExpirationTime;
  const FORMAT = 'YYYY-MM-DD HH:mm:ss'
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
  console.log(numTokensDeleted)
};

/*
 * Queries the token table to see if a
 * token is been marked as invalid (due to user logout, etc)
*/
const inactiveToken = async (token) => {

  var found = await Tokens.findOne({
      where: {
        token: token
      }
  });
  return found;
};

/*
Pass the refresh token to client, when their access token expires, they will pass that in here.
The refresh token is essentially useless to the client as all the routes require a jwt.verify(accessToken)
refresh token will only be used to say the user logged in validly, so we issue them an access token
*/

const refreshToken = async (token) => {

};

module.exports = {
  removeTokens,
  inactiveToken
}