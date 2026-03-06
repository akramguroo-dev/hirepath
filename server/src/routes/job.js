const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
  res.json({ message: 'This route creates a job' });
});

router.get('/', (req, res) => {
  res.json({ message: 'This route shows all jobs' });
});

router.get('/:id', (req, res) => {
  res.json({ message: 'This route shows a single job' });
});

module.exports = router;