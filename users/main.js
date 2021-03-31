const express = require('express');

// Constants
const PORT = 5001;
const HOST = '0.0.0.0';

// App
const app = express();

// Health Check
app.get('/', (req, res) => {
  res.send('OK');
});

app.listen(PORT, HOST);