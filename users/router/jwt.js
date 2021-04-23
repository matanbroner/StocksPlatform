const express = require('express');
const jwt = require('jsonwebtoken');

const jwtRouter = express.Router();
jwtRouter.use(express.json());


jwtRouter.route('/verify')
    .post(async (req, res) => {
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
        jwt.verify(token, process.env.tokenSecret, (error, decodedToken) => {

            if (error) {
                console.log('Error validiating token, cannot access resource.');
                res.status(403).json({
                    status: 403,
                    error: "Password is incorrect"
                });
            } else {
                res.status(200).json({
                    status: 200,
                    data: decodedToken
                });
            }

        });
    });

module.exports = jwtRouter;