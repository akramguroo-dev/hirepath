const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
  job_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  employer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  last_message: {
    type: String,
    default: null
  },
  last_message_at: {
    type: Date,
    default: Date.now,
    index: true // Sort conversations by most recent
  },
  unread_count_student: {
    type: Number,
    default: 0
  },
  unread_count_employer: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['active', 'archived'],
    default: 'active'
  }
}, { timestamps: true });

// Compound index: find conversations for specific user
conversationSchema.index({ student_id: 1, employer_id: 1 });

module.exports = mongoose.model('Conversation', conversationSchema);