const express = require('express');
const jobController = require('../controllers/jobController');

const router = express.Router();

router.post('/', jobController.createJob);

router.get('/', jobController.getAllJobs);

router.get('/:id', jobController.getJobById);

module.exports = router;