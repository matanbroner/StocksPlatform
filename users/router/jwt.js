const express = require('express');
const jwt = require('jsonwebtoken');

const jwtRouter = express.Router();
jwtRouter.use(express.json());


jwtRouter.route('/verify')
.post(async (req, res) => {
    var token = req.body.token;
    
    jwt.verify(token, process.env.tokenSecret, (error, decodedToken) => {

        if(error) {
            console.log('Error validiating token, cannot access resource.');
            res.status(403).json({"error":"Password is incorrect"});
        }
        else {
            res.setHeader('Authorization', token); 
            res.status(200).json({
                "data": 'success'
            });
        }

    });
});

module.exports = jwtRouter;
