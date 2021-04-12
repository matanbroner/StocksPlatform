
const PasswordModule = require('../utils/passwords');

(async () => {
    var newPassword = await PasswordModule.encrypt('asdasdasd');

})();

var user = {
    username: "admins",
    email: "admisn@gmail.com",
    password: "admins12d3"
}


const config = require('../config');
const jwt = require('jsonwebtoken');

var jwtToken = jwt.sign(user, config.tokenSecret, { expiresIn: '5h' });
console.log(jwtToken);
