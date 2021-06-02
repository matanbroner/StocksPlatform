const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const userRouter = require("./router/users");
const tokenRouter = require("./router/tokens");
const jwtRouter = require("./router/jwt")
const passport = require("passport");
const oauthRouter = require("./router/oauth");

require("./config/passport")

const app = express();
dotenv.config();


app.use(cors());
app.use('/jwt', jwtRouter);

app.use(passport.initialize());
app.use('/users', userRouter);
app.use('/tokens', tokenRouter);
app.use('/oauth', oauthRouter.oauthRouter);

dotenv.config();

app.get("/", (req, res) => {
  res.send("User Service API is running");
});

app.listen(process.env.PORT || 5001);
