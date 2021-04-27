const express = require('express');
const jwt = require('jsonwebtoken');
const Models = require('../models');

const tokensRouter = express.Router();
tokensRouter.use(express.json());

const QueryModule = require('../utils/query');

tokensRouter.route('/verify')
.post(async (req, res) => {

    var header = req.get("authorization");  // Gets the "authorization" header
    if (!header) {
        res.status(403).json({
            status: 403,
            error: "Authorization header required for verification"
        });
    }
    header = header.split(" ")
    if(header.length !== 2 || header[0] !== "Bearer"){
        res.status(403).json({
            status: 403,
            error: "Invalid authorization header"
        });
    }

    var token = header[1];

    //This will clear any invalid tokens when they expire in the db. Should move this somewhere else
    await QueryModule.removeTokens();

    if(await QueryModule.inactiveToken(token)) {
        console.log('Error validiating token, cannot access resource.');
        res.status(403).json({"error":"Token is invalidated or Inactive"});
    }

   else{
    
        jwt.verify(token, process.env.JWT_KEY, async (error, decodedToken) => {
            
            if(error) {

                if(error.name === 'TokenExpiredError') {
                    await QueryModule.refreshToken(req.body.refreshKey, (newAccessToken) => {
                        
                        if(newAccessToken === "error") {
                            res.status(403).json({
                                status: 403,
                                error: "Incorrect Refresh Token, Access token expired"
                            });
                        }
                        else {
                            res.status(200).json({
                                status: 200,
                                data: { accessKey: newAccessToken }    // Don't need to send back refresh token
                            });
                        }
                    });
                }
                else{
                    console.log('Error validiating token, cannot access resource.');
                    res.status(403).json({
                        status: 403,
                        error: "Access Token is incorrect"
                    });
                }
            }
            else {
                res.setHeader('Authorization', token); 
                res.status(200).json({
                    status: 200,
                    data: decodedToken
                });
            }

        });
    }
});

/* 
 * Adds a route to log a user out by blacklisting the JWT token.
 * This route doesn't support GET, PUT, DELETE requests
 * Currently does nothing with Refresh Token
*/
tokensRouter.route('/logout')
.post(async (req, res, next) => {

    try {
        
        var header = req.get("authorization");
        if (!header) {
            res.status(403).json({
                status: 403,
                error: "Authorization header required for verification"
            });
        }
        header = header.split(" ")
        if(header.length !== 2 || header[0] !== "Bearer"){
            res.status(403).json({
                status: 403,
                error: "Invalid authorization header"
            });
        }
    
        var token = header[1];

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
			const tokenEntry = { token: token, valid: false }
			Models.Tokens.create(tokenEntry)
                .then((result) => {
				    res.status(200).json({
                        status: 200,
                        data:"success"
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

module.exports = tokensRouter;
