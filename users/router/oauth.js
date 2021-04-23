const express = require('express');
const dotenv = require('dotenv')
const passport = require('passport');

const oauthRouter = express.Router();

oauthRouter.use(express.json());
dotenv.config();

/*
 * This will redirect to /login/success upon login.
 * Before the function in that endpoint actives, we go to the
 * callback function defined in passport.js with the user info.
*/
oauthRouter.get('/login', passport.authenticate('google', { scope:
    [ 'email', 'profile' ] }
));

oauthRouter.get('/login/success', (req, res) => {
    res.json({'result': 'success'})
});

module.exports = oauthRouter;
