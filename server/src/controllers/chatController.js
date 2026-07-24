const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const User = require('../models/User');

// ============================================
// Get all conversations for logged-in user
// ============================================
exports.getConversations = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find conversations where user is either student or employer
    const conversations = await Conversation.find({
      $or: [
        { student_id: userId },
        { employer_id: userId }
      ],
      status: 'active'
    })
      .populate('student_id', 'name profilePhoto')
      .populate('employer_id', 'name profilePhoto')
      .populate('job_id', 'title company')
      .sort({ last_message_at: -1 })
      .limit(50);

    res.json(conversations);
  } catch (error) {
    console.error('[CHAT] Error fetching conversations:', error);
    res.status(500).json({ error: 'Failed to fetch conversations' });
  }
};

// ============================================
// Get or create conversation between two users
// ============================================
exports.getOrCreateConversation = async (req, res) => {
  try {
    const userId = req.user.id;
    const { otherUserId, jobId } = req.body;

    // Validate inputs
    if (!otherUserId || !jobId) {
      return res.status(400).json({ error: 'otherUserId and jobId required' });
    }

    // Find existing conversation
    let conversation = await Conversation.findOne({
      $or: [
        { student_id: userId, employer_id: otherUserId, job_id: jobId },
        { student_id: otherUserId, employer_id: userId, job_id: jobId }
      ]
    });

    // If doesn't exist, create it
    if (!conversation) {
      // Determine who is student and who is employer
      const user = await User.findById(userId);
      const otherUser = await User.findById(otherUserId);

      const studentId = user.role === 'student' ? userId : otherUserId;
      const employerId = user.role === 'employer' ? userId : otherUserId;

      conversation = new Conversation({
        job_id: jobId,
        student_id: studentId,
        employer_id: employerId,
        status: 'active'
      });

      await conversation.save();
    }

    // Populate and return
    await conversation.populate('student_id', 'name profilePhoto');
    await conversation.populate('employer_id', 'name profilePhoto');
    await conversation.populate('job_id', 'title company');

    res.json(conversation);
  } catch (error) {
    console.error('[CHAT] Error creating conversation:', error);
    res.status(500).json({ error: 'Failed to create conversation' });
  }
};

// ============================================
// Get message history for a conversation
// ============================================
exports.getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { page = 1, limit = 50 } = req.query;

    // Pagination
    const skip = (page - 1) * limit;

    const messages = await Message.find({ conversation_id: conversationId })
      .populate('sender_id', 'name profilePhoto email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    // Reverse to show oldest first
    messages.reverse();

    res.json(messages);
  } catch (error) {
    console.error('[CHAT] Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

// ============================================
// Mark messages as read
// ============================================
exports.markMessagesAsRead = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const userId = req.user.id;

    // Mark all unread messages in this conversation as read
    await Message.updateMany(
      { 
        conversation_id: conversationId,
        read: false
      },
      { read: true }
    );

    // Reset unread count for this user
    const conversation = await Conversation.findById(conversationId);
    
    if (conversation.student_id.toString() === userId) {
      conversation.unread_count_student = 0;
    } else {
      conversation.unread_count_employer = 0;
    }

    await conversation.save();

    res.json({ message: 'Messages marked as read' });
  } catch (error) {
    console.error('[CHAT] Error marking messages as read:', error);
    res.status(500).json({ error: 'Failed to mark messages as read' });
  }
};

// ============================================
// Helper: Save message to database
// (Called by Socket.io handler)
// ============================================
exports.saveMessage = async (conversationId, senderId, text) => {
  try {
    // Create and save message
    const message = new Message({
      conversation_id: conversationId,
      sender_id: senderId,
      text: text,
      read: false
    });

    await message.save();

    // Update conversation's last_message and last_message_at
    await Conversation.findByIdAndUpdate(
      conversationId,
      {
        last_message: text,
        last_message_at: new Date()
      }
    );

    // Populate sender info and return
    await message.populate('sender_id', 'name profilePhoto email');

    return message;
  } catch (error) {
    console.error('[CHAT] Error saving message:', error);
    throw error;
  }
};

// ============================================
// Helper: Increment unread count
// (Called by Socket.io handler)
// ============================================
exports.incrementUnreadCount = async (conversationId, recipientId) => {
  try {
    const conversation = await Conversation.findById(conversationId);

    if (conversation.student_id.toString() === recipientId) {
      conversation.unread_count_student += 1;
    } else {
      conversation.unread_count_employer += 1;
    }

    await conversation.save();
  } catch (error) {
    console.error('[CHAT] Error incrementing unread count:', error);
    throw error;
  }
};