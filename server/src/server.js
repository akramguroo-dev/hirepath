// Core
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

// Config
const connectDB = require('./config/db');

// Routes
const authRoutes = require('./routes/auth');
const jobRoutes = require('./routes/job');
const applicationRoutes = require('./routes/application');

// Middleware
const authMiddleware = require('./middleware/authMiddleware');

const app = express();
app.set('trust proxy', 1);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // max 20 requests per IP per 15 mins 
  message: { error: "Too many requests, please try again later" }
});

app.use(express.json());
app.use(helmet());
app.use(cors({
  origin: [process.env.CLIENT_URL, 'http://localhost:5173'],
  credentials: true
}));

app.use('/api/auth', limiter, authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);

app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({ message: 'Protected route accessed', user: req.user });
});


app.get('/api/test', (req, res) => {
  res.json({ message: "API is working" });
});

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on ${process.env.PORT}`);
});

