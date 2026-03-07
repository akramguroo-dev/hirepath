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

const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate('posted_by', 'name email');
    res.json({ jobs });
  } catch (err) {
    res.status(500).json({ error: err.message });
  };
};

const getJobById = async (req, res) => {
  try {
    const id = req.params.id;
    const job = await Job.findById(id).populate('posted_by', 'name email');

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    
    res.json({ job });
  } catch (err) {
    res.status(500).json({ error: err.message });
  };
};

module.exports = {
  createJob,
  getAllJobs,
  getJobById,
}