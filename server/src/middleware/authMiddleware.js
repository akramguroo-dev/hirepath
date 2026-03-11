const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ error: 'Authorization token required' });
  }

  const token = authorization.split(' ')[1];

  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findOne({ _id: userId }).select('_id role email is_verified');
    next();
  } catch (err) {
    res.status(401).json({ error: 'Request is not authorized' });
  };
};

module.exports = authMiddleware;