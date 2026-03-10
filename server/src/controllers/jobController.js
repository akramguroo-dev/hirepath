const { json } = require('express');
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

const deleteJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    if (job.posted_by.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized to delete this job' });
    }

    await Job.findByIdAndDelete(id);
    res.status(200).json({ message: 'The job is deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  };
};

module.exports = {
  createJob,
  getAllJobs,
  getJobById,
  deleteJobById,
}