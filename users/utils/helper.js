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

module.exports = {
  checkAuthorizationHeaders,
  checkSignupRequest,
}
