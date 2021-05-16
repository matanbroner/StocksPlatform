const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const userRouter = require("./router/users");
const tokenRouter = require("./router/tokens");
const oauthRouter = require("./router/oauth");

const passport = require("passport");
require("./config/passport")

const Events = require("./utils/events");

const app = express();

app.use(passport.initialize());
app.use(cors());
app.use('/users', userRouter);
app.use('/tokens', tokenRouter);
app.use('/oauth', oauthRouter);

dotenv.config();

app.get("/", (req, res) => {
  res.send("User Service API is running");
});

const intervalSeconds = 200000

setInterval(() => { Events.removeInvalidTokens() }, intervalSeconds);

var server = app.listen(process.env.PORT || 5001);

module.exports = server;
