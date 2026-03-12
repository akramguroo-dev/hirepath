const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const applicationModel = new Schema({
  job_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job', 
    required: true,
  },
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },
  resume_url: {
    type: String,
  },
  cover_letter: {
    type: String,
  },
  employer_feedback: {
    type: String,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  }
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationModel);