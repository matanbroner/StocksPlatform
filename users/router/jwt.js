const express = require("express");
const jwt = require("jsonwebtoken");
const Models = require("../models");

const QueryModule = require("../utils/query");

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
  var token = req.body.accessKey;

  jwt.verify(token, process.env.JWT_KEY, async (error, decodedToken) => {
    try {
      if (error) {
        throw error;
      } else {
        const user = await getUserFromDecodedToken(decodedToken);
        if (!user) {
          throw new Error("Unable to access user profile from decoded token");
        }
        delete user.password;
        res.status(200).json({
          data: user,
        });
      }
    } catch (e) {
      console.log(e)
      res.status(403).json({ error: String(e) });
    }
  });
});

jwtRouter.route("/refresh").post(async (req, res) => {
  const { refreshKey } = req.body;
  await QueryModule.refreshToken(refreshKey, (accessKey) => {
    if (accessKey === null) {
      res.status(403).json({
        status: 403,
        error: "Incorrect Refresh Token, Access token expired",
      });
    } else {
      res.status(200).json({
        status: 200,
        data: { accessKey }, // Don't need to send back refresh token
      });
    }
  });
});

module.exports = jwtRouter;
