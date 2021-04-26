const express = require('express');
const dotenv = require('dotenv')
const passport = require('passport');
const jwt = require("jsonwebtoken");

const oauthRouter = express.Router();

oauthRouter.use(express.json());
dotenv.config();

/*
 * This will redirect to /login/success upon login.
*/
oauthRouter.get('/login', passport.authenticate('google', { scope:
    [ 'email', 'profile' ] }
));

/*
 * Before the function here begins, we go to the callback function defined in passport.js with the user info.
 * We get the user information and call a callback in that callback to come back here.
*/
oauthRouter.get('/login/success',
    passport.authenticate('google', { failureRedirect: '/users/login' }), (req, res) => {

        console.log(req.user)

        const { id, email, provider} = req.user;
        const username = req.user.username;

        var accessToken = jwt.sign(
            {
                id,
                username,
                email,
                provider,
            },
            process.env.tokenSecret,
            {
                expiresIn: process.env.tokenExpiration
            }
            
        );
        var refreshToken = jwt.sign(
            {
                id,
                username,
                email,
                provider,
            },
            process.env.tokenSecret,
            {
                expiresIn: process.env.tokenExpiration
            }
            
        );
        const user = {
            username: username,
            email: email,
            firstName: req.user.firstName,
            lastName: req.user.lastName,
        }
        return res.status(200).json({
            status: 200,
            data: { ...user, accessKey: accessToken, refreshKey: refreshToken },
        });

    });

module.exports = oauthRouter;
