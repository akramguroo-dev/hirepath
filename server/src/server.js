const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');

const app = express();

app.use('/api/auth', authRoutes);

app.get('/api/test', (req, res) => {
  res.json({ message: "API is working" });
});

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on ${process.env.PORT}`);
});

