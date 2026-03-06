const createJob = (req, res) => {
  res.json({ message: 'This is createJob controller running'});
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