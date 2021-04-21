const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

//const sequelize = require('./db/database');
const userRouter = require("./router/users");
const jwtRouter = require("./router/jwt");

// App
const app = express();
dotenv.config();


app.use(cors());
app.use('/users', userRouter);
app.use('/jwt', jwtRouter);

app.get("/", (req, res) => {
  res.send("User Service API is running");
});

/*
(async () => {
  await sequelize.sync({force: true})
})();
*/

app.listen(process.env.PORT || 5001);
