const express = require('express');
const jwt = require('jsonwebtoken');

const { Op } = require("sequelize");
const Users = require('../models/Users');
const userRouter = express.Router();
const config = require('../config');

const PasswordModule = require('../utils/passwords');

userRouter.use(express.json());

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

		var userExists = await Users.findAll({
			where: {
			  [Op.or]: [
				{ username: newUsername },
				{ email: newEmail }
			  ]
			}
		});

		if(userExists.length > 0) {
			res.status(401).json({"result":"failed"});
		}
		else {

			const newUser = {
				username: newUsername,
				email: newEmail,
				password: newPassword,
			}

			Users.create(newUser).then((result) => {	// result will essentially be the user fields
				res.status(200).json({"result":"success"});
			}).catch((err) => console.log(err));
		}
	
	} catch (error) {
		return res.status(400).json({"result":"failed"});
	}
})
.all((req,res,next) => {
    res.status(405).json({"result":"not-supported"});
});

/* 
 * Adds a route to verify user login.
 * Sends response that verifies that user credentials is in database.
 * This route doesn't support GET, PUT, DELETE requests
*/
userRouter.route('/login')
.post(async (req, res, next) => {
	try {

		var username = req.body.username;
		var email = req.body.email;
		var password = req.body.password;

		var user = await Users.findAll({
			attributes: ['username', 'email', 'password'],
			where: {
			  [Op.and]: [
				{ username: username },
				{ email: email }
			  ]
			}
		});

		if(user.length == 0) {
			res.status(401).json({"result":"failed"});
		}
		else{
			if(await PasswordModule.compare(password, user[0].password)) {
				// Send JWT
				var jwtToken = jwt.sign({
					username: username,
					email: email
				}, config.tokenSecret, { expiresIn: '5h' });

				res.status(200).json({"result":"success", token: jwtToken});
			}
			else{
				res.status(401).json({"result":"failed"});
			}
		}
	
	} catch (error) {
		return res.status(400).json({"result":"failed somewhere during process"});
	}
})
.all(async(req,res,next) => {
    res.status(405).json({"result":"not-supported"});
});


module.exports = userRouter;
