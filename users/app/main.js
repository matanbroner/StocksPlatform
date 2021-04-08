const express = require('express');

const sequelize = require('./db/database');
const Schemas = require('./models/schemas');

// Constants
const PORT = 3001;
const HOST = "0.0.0.0";

// App
const app = express();

// Health Check
app.get("/", (req, res) => {
  res.send("OK");
});

(async () => {
  try {
    await sequelize.sync(
      { force: false } //Reset db every time
    );
    app.listen(process.env.EXTERNAL_PORT); //DEF in docker.compose.yml
  } catch (error) {
    console.log(error);
  }
})();