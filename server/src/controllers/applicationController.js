const Application = require('../models/Application');
const Job = require('../models/Job');

const applyToJob = async (req, res) => {
  try {
    const { job_id, resume_url, cover_letter } = req.body;
    const student_id = req.user._id;

    if (req.user.role !== 'student') {
      return res.status(403).json({ error: 'Only students can apply' });
    }

    const job = await Job.findById(job_id);
    if(!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    const existingApp = await Application.findOne({ job_id, student_id });
    if (existingApp) {
      return res.status(400).json({ error: 'Already applied' });
    }

    const application = await Application.create({
      job_id,
      student_id,
      resume_url,
      cover_letter
    });

    res.status(201).json({ application });
  } catch (err) {
    res.status(500).json({ error: err.message });
  };
};

const getMyApplications = async (req, res) => {
  try {
    const myApplications = await Application.find({ student_id: req.user._id }).populate('job_id', 'title company description location type duration');
    
    res.json({ myApplications });
  } catch (err) {
    res.status(500).json({ error: err.message });
  };
};

const getJobApplications = async (req, res) => {
  res.json({ message: 'getJobApplications controller working' });
};

module.exports = {
  applyToJob,
  getMyApplications,
  getJobApplications,
};