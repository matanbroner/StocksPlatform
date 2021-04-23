const express = require('express');
const jwt = require('jsonwebtoken');
const Models = require('../models');

const tokensRouter = express.Router();
tokensRouter.use(express.json());

const QueryModule = require('../utils/query');

tokensRouter.route('/verify')
.post(async (req, res) => {
    var token = req.body.token;

    await QueryModule.removeTokens();

    /*
     * Verify if token is inactive because user logged out
    */
   if(await QueryModule.inactiveToken(token)) {
        console.log('Error validiating token, cannot access resource.');
        res.status(403).json({"error":"Token is invalid"});
   }

   else{
    
        jwt.verify(token, process.env.tokenSecret, (error, decodedToken) => {

            if(error) {
                console.log('Error validiating token, cannot access resource.');
                res.status(403).json({"error":"Token is incorrect"});
            }
            else {
                res.setHeader('Authorization', token); 
                res.status(200).json({
                    "data": 'success'
                });
            }

        });
    }
});

/* 
 * Adds a route to log a user out by blacklisting the JWT token.
 * This route doesn't support GET, PUT, DELETE requests
*/
tokensRouter.route('/logout')
.post(async (req, res, next) => {

    try {

        var token = req.body.token;
		var tokenExists = await Models.Tokens.findOne({
			where: { token: token }
		});

		if(tokenExists) {
			res.status(401).json({"error":"Token is already blacklisted"});
		}
		else {
            //value too long
			const tokenEntry = { token: token, valid: false }
			Models.Tokens.create(tokenEntry).then((result) => {
				res.status(200).json({"data":"success"});
			}).catch((err) => console.log(err));
		}
	
	} catch (error) {
		return res.status(400).json({"error":"Request has failed"});
	}

});

module.exports = tokensRouter;
