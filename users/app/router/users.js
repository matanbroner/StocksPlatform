const express = require('express');
import { Users } from '../models/Users'

const userRouter = express.Router();

app.use(express.json());

//-------------------------
userRouter.route('/login')
.get((req,res,next) => {
    res.end('Not Implemented');
})
.post(async (req, res, next) => {
	try {
		const USER_MODEL = {
			username: req.body.username,
			email: req.body.email,
			password: req.body.password,
		}
	
	} catch (error) {
		return res.status(400).json("Bad Request");
	}
})
.put((req, res, next) => {
    
})
.delete((req, res, next) => {
});



module.exports = userRouter;

/*
  try {
      await database.Users.findAll()
      .then( persons => {
        res.status(200).send(JSON.stringify(persons));
      })
      .catch( err => {
        res.status(500).send(JSON.stringify(err));
      });

  } catch (err) {
      console.error(err.message);
  }

*/