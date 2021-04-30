const express = require("express");
const jwt = require("jsonwebtoken");
const Models = require("../models");

const jwtRouter = express.Router();
jwtRouter.use(express.json());

const getUserFromDecodedToken = async (decodedToken) => {
  const { id } = decodedToken;
  const user = await Models.Users.findByPk(id, {
    raw: true,
  });
  return user;
};

jwtRouter.route("/verify").post((req, res) => {
  var token = req.body.token;

  jwt.verify(token, process.env.JWT_KEY, async (error, decodedToken) => {
    try {
      if (error) {
        throw error;
      } else {
        const user = await getUserFromDecodedToken(decodedToken);
        if (!user) {
          throw new Error("Unable to access user profile from decoded token")
        }
        delete user.password;
        res.status(200).json({
          data: user,
        });
      }
    } catch (e) {
      res.status(403).json({ error: String(e) });
    }
  });
});

module.exports = jwtRouter;
