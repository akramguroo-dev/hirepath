const Job = require('../models/Job');

const createJob = async (req, res) => {
  try {
    const jobData = req.body;
    const employer = req.user;
    if (employer.role !== 'employer') {
      return res.status(403).json({ error: 'Only employers can post jobs' });
    }

    const job = await Job.create({ ...jobData, posted_by: employer._id });
    
    res.status(201).json({ job });
  } catch (err) {
    res.status(500).json({ error: err.message });
  };
};

const getAllJobs = (req, res) => {
  res.json({ message: 'This is getAllJobs controller running'});
};

const getJobById = (req, res) => {
  res.json({ message: 'This is getJobById controller running'});
};

module.exports = {
  createJob,
  getAllJobs,
  getJobById,
}