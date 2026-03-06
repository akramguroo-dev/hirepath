const express = require('express');
const jobController = require('../controllers/jobController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, jobController.createJob);

router.get('/', jobController.getAllJobs);

router.get('/:id', jobController.getJobById);

module.exports = router;