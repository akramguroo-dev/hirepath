const applyToJob = async (req, res) => {
  res.json({ message: 'applyToJob controller working' });
};

const getMyApplications = async (req, res) => {
  res.json({ message: 'getMyApplications controller working' });
};

const getJobApplications = async (req, res) => {
  res.json({ message: 'getJobApplications controller working' });
};

module.exports = {
  applyToJob,
  getMyApplications,
  getJobApplications,
};