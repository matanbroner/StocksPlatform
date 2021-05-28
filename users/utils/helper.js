const jwt = require("jsonwebtoken");
const QueryModule = require("./query");
const moment = require('moment');
/*
 * Receives the request argument passed into an API endpoint.
 * Evaluates if there is a header, 'authorization', and that
 * there is a passed in Bearer Token.
*/
const checkAuthorizationHeaders = async (req) => {
    var header = req.get("authorization");  // Gets the "authorization" header
    if (!header) {
        return {
            status: 403,
            error: "Authorization header required for verification"
        };
    }
    header = header.split(" ")
    if(header.length !== 2 || header[0] !== "Bearer"){
        return {
            status: 403,
            error: "Invalid authorization header"
        };
    }
    var token = header[1];

    if(await QueryModule.inactiveToken(token)) {
        return {
            status: 403,
            error:"Token is invalidated or Inactive"
        };
    }
    return {
        status: 200,
        token: header[1]
    };
}

const checkSignupRequest = async (req) => {
    
    // Depending on if we want to check the requirements of a username, etc, this will be reworked.
    const attributes = ['firstName', 'lastName', 'username', 'email', 'password'];
    //attributes.forEach(async (attribute) => {
    for(var index = 0; index < attributes.length; index++) {
        if(!req.body.hasOwnProperty(attributes[index])) {
            return false;
        }
    }
    return true;
}

const createAccessToken = async (payload) => {
    var accessToken = jwt.sign(
        {
          payload
        },
        process.env.JWT_KEY,
        {
          expiresIn: process.env.JWT_EXPIRES
        }
    );
    return accessToken;
}

const createRefreshToken = async (payload) => {
    var refreshToken = jwt.sign(
        {
          payload
        },
        process.env.REFRESH_SECRET,
        {
          expiresIn: process.env.REFRESH_EXPIRES
        }
    );
    return refreshToken;
}

const getUTC = async () => {
  return moment().format('YYYY-MM-DD HH:mm:ss');
}

module.exports = {
  checkAuthorizationHeaders,
  checkSignupRequest,
  createAccessToken,
  createRefreshToken,
  getUTC
}
