const express = require('express');
const cors = require('cors');

const sequelize = require('./db/database');
const userRouter = require("./router/users");

// App
const app = express();


app.use(cors());
app.use('/users', userRouter);

app.get("/", (req, res) => {
  res.send("Backend is working");
});

(async () => {
  await sequelize.sync({force: true})
})();

app.listen(5001);
