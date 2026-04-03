const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['internship', 'full-time', 'part-time'],
    required: true,
  },
  salary: {
    type: Number,
  },
  duration: {
    type: String,
  },
  startDate: {
    type: String,
  },
  applyBy: {
    type: String,
  },
  applicants: {
    type: Number,
    default: 0,
  },
  skills: {
    type: [String],
    default: [],
  },
  posted_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['open', 'closed'],
    default: 'open',
  },
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);