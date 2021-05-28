const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const { Op } = require("sequelize");
const Models = require("../models");
const userRouter = express.Router();

const PasswordModule = require("../utils/passwords");
const HelperModule = require("../utils/helper");
const QueryModule = require("../utils/query");

const oauth = require("./oauth");
userRouter.use(express.json());
dotenv.config();

/*
 * Adds a route to add user credentials into database.
 * Sends response that verifies we successfully inserted.
 * This route doesn't support GET, PUT, DELETE requests
 */
userRouter
  .route("/sign-up")
  .post(async (req, res, next) => {
    try {
      
      if(!(await HelperModule.checkSignupRequest(req))) {
        res.status(401).json({
          status: 401,
          error: "Missing field component(s)"
        });
      }

      var newFirstName = req.body.firstName;
      var newLastName = req.body.lastName;
      var newUsername = req.body.username;
      var newEmail = req.body.email;
      var newPassword = await PasswordModule.encrypt(req.body.password);

      var userExists = await Models.Users.findOne({
        where: {
          [Op.or]: [
            {
              email: newEmail,
            }
          ],
        },
      });

      if (userExists) {
        res.status(401).json({
          status: 401,
          error: "User with the username or email exists",
        });
      } else {
        const newUser = {
          firstName: newFirstName,
          lastName: newLastName,
          username: newUsername,
          email: newEmail,
          password: newPassword,
          local: true,
        };

        Models.Users.create(newUser)
          .then((result) => {
            delete newUser.password;
            res.status(200).json({
              status: 200,
              data: newUser,
            });
          })
          .catch((err) => console.log(err));
      }
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: `Server error: ${error.toString()}`,
      });
    }
  })
  .all((req, res, next) => {
    res.status(405).json({
      status: 405,
      error: "not-supported",
    });
  });

/* 
 * Adds a route to verify user login.
 * Sends response that verifies that user credentials is in database.
 * This route doesn't support GET, PUT, DELETE requests
*/
userRouter
  .route("/login")
  .post(async (req, res, next) => {
    try {
      var { email, password } = req.body;

      var user = await Models.Users.findOne({
        attributes: ["id", "firstName", "lastName", "username", "email", "password"],
        where: {
          email,
        },
      });

      if (user === null) {
        res.status(401).json({
          status: 401,
          error: "Invalid credentials",
        });
      } else {
        if (await PasswordModule.compare(password, user.password)) {
		      const { id, username, email } = user;
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

          var refreshToken = jwt.sign(
            {
              id,
              username,
              email,
            },
              process.env.REFRESH_SECRET,
            {
              expiresIn: process.env.REFRESH_EXPIRES
            }
          );

          delete user.password;
          res.status(200).json({
            status: 200,
            data: { ...user.toJSON(), accessKey: accessToken, refreshKey: refreshToken },
          });
        } else {
          res.status(401).json({
            status: 401,
            error: "Password is incorrect",
          });
        }
		}
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: `Server error: ${error.toString()}`,
      });
    }
  })
.all(async (req, res, next) => {
  res.status(405).json({
    sttaus: 405,
    error: "not-supported",
  });
});

/* 
 * Adds a route to log a user out by blacklisting the JWT token.
 * This route doesn't support GET, PUT, DELETE requests
*/
userRouter.route('/logout')
.post(async (req, res, next) => {

    try {
        
      var headerResult = await HelperModule.checkAuthorizationHeaders(req);

      if(headerResult.status == 403) {
          res.status(403).json({
              headerResult
          });
      }

      var token = headerResult.token;

      var tokenExists = await Models.Tokens.findOne({
        where: { token: token }
      });

      if(tokenExists) {
        res.status(401).json({
                  status: 401,
                  error:"Token is already blacklisted"
              });
      }
      else {
        // Just reset it even if not oauth logged in
        await oauth.clearProfile();

        const tokenEntry = { token: token, valid: false }
        Models.Tokens.create(tokenEntry)
          .then(async (result) => {
            console.log('profile ', await oauth.checkProfile());
				    res.status(200).json({
              status: 200,
              data: "success"
            });
			    }).catch((err) => console.log(err));
		  }
	
    } catch (error) {
      return res.status(400).json({
              status: 400,
              error:"Request has failed"
          });
    }

});

// Use delete without passing any data in body to be RESTful (not that it matters)
userRouter.route('/delete-account/:email')
.delete(async (req, res) => {

  try {
        
    var headerResult = await HelperModule.checkAuthorizationHeaders(req);

    if(headerResult.status == 403) {
        res.status(403).json({
            headerResult
        });
    }

    var token = headerResult.token;

    if(await QueryModule.inactiveToken(token)) {
        res.status(403).json({
            status: 403,
            error:"Token is invalidated or Inactive"
        });
    } else{
        jwt.verify(token, process.env.JWT_KEY, async (error, decodedToken) => {
            
          if(error) {
            res.status(403).json({
                status: 403,
                error: "Access Token is incorrect"
            });
          } else {
            const email = req.params.email;

            var userDeleted = await Models.Users.destroy({
              where: {
                email
              },
            });

            if(userDeleted) {
              
              const tokenEntry = { token: token, valid: false }
              await Models.Tokens.create(tokenEntry)

              res.status(200).json({
                  status: 200
              });
              
            } else {
                res.status(403).json({
                  status: 403,
                  error: "Access Token is valid, email is incorrect"
                });
            }
          }
        });
      }
  } catch (error) {
    return res.status(400).json({
            status: 400,
            error:"Request has failed"
        });
  }

});

userRouter.route("/change-password")
.post(async (req, res) => {
  try {

    var headerResult = await HelperModule.checkAuthorizationHeaders(req);

    if(headerResult.status == 403) {
        res.status(403).json({
            headerResult
        });
    }

    var token = headerResult.token;

    if(await QueryModule.inactiveToken(token)) {
        res.status(403).json({
            status: 403,
            error:"Token is invalidated or Inactive"
        });
    } else{
        jwt.verify(token, process.env.JWT_KEY, async (error, decodedToken) => {
            
          if(error) {
            res.status(403).json({
                status: 403,
                error: "Access Token is incorrect"
            });
          } else {
              var { email, currentPassword, newPassword } = req.body;

              var userExists = await Models.Users.findOne({
                where: {
                  email
                },
              });

              if(userExists && await PasswordModule.compare(currentPassword, userExists.password)) {
                
                var encryptedPassword = await PasswordModule.encrypt(newPassword);

                await Models.Users.update(
                  {password: encryptedPassword},
                  {where: { email }}
                ).then((result) => {
                  res.status(200).json({
                    status: 200,
                    data: "Password changed successfully"
                  });
                }).catch((err) => {
                  console.log(err);
                });

              } else {
                res.status(403).json({
                  status: 403,
                  error: `Incorrect Credentials: ${email}, ${currentPassword}`
                });
              }
          }
        });
      }

  } catch (error) {
    return res.status(400).json({
            status: 400,
            error:"Request has failed"
        });
  }
});

module.exports = userRouter;
