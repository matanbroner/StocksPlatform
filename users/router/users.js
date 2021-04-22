const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')

const { Op } = require("sequelize");
const Models = require('../models');
const userRouter = express.Router();

const PasswordModule = require('../utils/passwords');

userRouter.use(express.json());
dotenv.config();

/* 
 * Adds a route to add user credentials into database.
 * Sends response that verifies we successfully inserted.
 * This route doesn't support GET, PUT, DELETE requests
*/
userRouter.route('/sign-up')
.post(async (req, res, next) => {
	try {
		var newUsername = req.body.username;
		var newEmail = req.body.email;
		var newPassword = await PasswordModule.encrypt(req.body.password);

		var userExists = await Models.Users.findOne({
			where: {
			  [Op.or]: [
				{ username: newUsername },
				{ email: newEmail }
			  ]
			}
		});

		//Could probably do userExists.username == newUsername to clarify
		if(userExists) {
			res.status(401).json({"error":"User with the username or email exists"});
		}
		else {
			const newUser = {
				username: newUsername,
				email: newEmail,
				password: newPassword,
			}

			Models.Users.create(newUser).then((result) => {
				delete newUser.password;
				res.status(200).json({"data":newUser});
			}).catch((err) => console.log(err));
		}
	
	} catch (error) {
		return res.status(400).json({"error":"Request has failed"});
	}
})
.all((req,res,next) => {
    res.status(405).json({"error":"not-supported"});
});

/* 
 * Adds a route to verify user login.
 * Sends response that verifies that user credentials is in database.
 * This route doesn't support GET, PUT, DELETE requests
*/
userRouter.route('/login')
.post(async (req, res, next) => {
	try {

		var { username, email, password } = req.body;

		var user = await Models.Users.findOne({
			attributes: ['id', 'username', 'email', 'password'],
			where: {
			  [Op.and]: [
				{ username: username },
				{ email: email }
			  ]
			}
		});

		if(user === null) {
			res.status(401).json({"error":"User does not exist"});
		}
		else{
			if(await PasswordModule.compare(password, user.password)) {
				// Send JWT
				var jwtToken = jwt.sign({
					user
				}, process.env.tokenSecret, { expiresIn: process.env.tokenExpiration });

				res.setHeader('Authorization', jwtToken);
				res.status(200).json({"data":"success"});
			}
			else{
				res.status(401).json({"error":"Password is incorrect"});
			}
		}
	
	} catch (error) {
		return res.status(400).json({"error":"Request has failed"});
	}
})
.all(async(req,res,next) => {
    res.status(405).json({"error":"not-supported"});
});


module.exports = userRouter;
