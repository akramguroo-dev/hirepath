const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db');

const app = express();

app.get('/api/test', (req, res) => {
  res.json({ message: "API is working" });
});

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on ${process.env.PORT}`);
});

