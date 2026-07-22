const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  conversation_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation',
    required: true,
    index: true // Speed up queries filtering by conversation
  },
  sender_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  text: {
    type: String,
    required: true,
    trim: true
  },
  read: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true // Speed up sorting by date
  }
});

module.exports = mongoose.model('Message', messageSchema);