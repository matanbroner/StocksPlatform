const express = require('express');
const jwt = require('jsonwebtoken');

const tokensRouter = express.Router();
tokensRouter.use(express.json());

const QueryModule = require('../utils/query');
const HelperModule = require('../utils/helper');

tokensRouter.route('/verify')
.post(async (req, res) => {

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
    }

   else{
    
        jwt.verify(token, process.env.JWT_KEY, async (error, decodedToken) => {
            
            if(error) {

                if(error.name === 'TokenExpiredError') {
                    await QueryModule.refreshToken(req.body.refreshKey, (newAccessToken) => {
                        
                        if(newAccessToken === null) {
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
                    res.status(403).json({
                        status: 403,
                        error: "Access Token is incorrect"
                    });
                }
            }
            else {
                res.setHeader('authorization', token); 
                res.status(200).json({
                    status: 200,
                    data: decodedToken
                });
            }

        });
    }
});

module.exports = tokensRouter;
