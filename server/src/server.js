// Core
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const cron = require('node-cron');
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

// Config
const connectDB = require('./config/db');

// Models
const Job = require('./models/Job');

// Routes
const authRoutes = require('./routes/auth');
const jobRoutes = require('./routes/job');
const applicationRoutes = require('./routes/application');
const uploadRoutes = require('./routes/uploadRoutes');
const chatRoutes = require('./routes/chat'); // NEW

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
app.use('/api/upload', uploadRoutes);
app.use('/api/chat', chatRoutes); // NEW

app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({ message: 'Protected route accessed', user: req.user });
});

app.get('/api/test', (req, res) => {
  res.json({ message: "API is working" });
});

connectDB();

// ============================================
// CRON JOB: Auto-close jobs on applyBy date
// ============================================
// Runs daily at 00:00 (midnight)
cron.schedule('0 0 * * *', async () => {
  try {
    console.log('[CRON] Running auto-close job check...');
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Find all open jobs where applyBy date has passed
    const jobsToClose = await Job.find({
      status: 'open',
      applyBy: { $exists: true, $ne: null }
    });

    let closedCount = 0;

    for (const job of jobsToClose) {
      if (job.applyBy) {
        const applyByDate = new Date(job.applyBy);
        applyByDate.setHours(0, 0, 0, 0);

        // If applyBy date has passed, close the job
        if (applyByDate < today) {
          await Job.findByIdAndUpdate(job._id, { status: 'closed' });
          closedCount++;
          console.log(`[CRON] Closed job: ${job.title} (ID: ${job._id})`);
        }
      }
    }

    console.log(`[CRON] Job auto-close completed. ${closedCount} job(s) closed.`);
  } catch (error) {
    console.error('[CRON] Error in auto-close job:', error);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on ${process.env.PORT}`);
  console.log('[CRON] Job scheduler initialized');
});