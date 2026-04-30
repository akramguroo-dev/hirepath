const Application = require("../models/Application");
const Job = require("../models/Job");

const applyToJob = async (req, res) => {
  try {
    const { job_id, resume_url, cover_letter } = req.body;
    const student_id = req.user._id;

    if (req.user.role !== "student") {
      return res.status(403).json({ error: "Only students can apply" });
    }

    const job = await Job.findById(job_id);
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    const existingApp = await Application.findOne({ job_id, student_id });
    if (existingApp) {
      return res.status(400).json({ error: "Already applied" });
    }

    const application = await Application.create({
      job_id,
      student_id,
      resume_url,
      cover_letter,
    });

    await Job.findByIdAndUpdate(job_id, { $inc: { applicants: 1 }});
    res.status(201).json({ application });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getMyApplications = async (req, res) => {
  try {
    const myApplications = await Application.find({
      student_id: req.user._id,
    }).populate("job_id", "title company description location type duration");

    res.json({ myApplications });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getJobApplications = async (req, res) => {
  try {
    if (req.user.role !== "employer") {
      return res.status(403).json({ error: "Only employers can access this" });
    }

    const { jobId } = req.params;
    const jobApps = await Application.find({ job_id: jobId }).populate(
      "student_id",
      "name email",
    );

    res.json({ jobApps });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const app = await Application.findById(id);
    if (!app) {
      return res.status(404).json({ error: "Application not found" });
    }

    const job = await Job.findById(app.job_id);
    if (job.posted_by.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Not authorized to update this application" });
    }
    
    const { status, employer_feedback, rating } = req.body;
    const updatedApp = await Application.findByIdAndUpdate(
      id,
      { status, employer_feedback, rating },
      { new: true, runValidators: true },
    );

    res.status(200).json({ updatedApp });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  applyToJob,
  getMyApplications,
  getJobApplications,
  updateApplicationStatus,
};
