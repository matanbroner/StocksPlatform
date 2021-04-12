const bcrypt = require('bcrypt');
const saltRounds = 3;

/*
 * Autogenerate a salt with saltRounds -> hash for a hashed password.
*/

const encryptPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

/*
 * Arguments: (Password the user entered, Hashed Password inside of the database)
*/

const comparePassword = async (originalPassword, hashedPassword) => {
  const equivalent = await bcrypt.compare(originalPassword, hashedPassword);
  return equivalent;
};

module.exports = {
    encrypt: encryptPassword,
    compare: comparePassword,
  }
