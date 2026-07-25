const jwt = require('jsonwebtoken');
const chatController = require('../controllers/chatController');

// Store active users: { userId: socketId }
const activeUsers = {};

module.exports = function initializeSocket(io) {
  // ============================================
  // Socket.io Middleware: Authenticate connection
  // ============================================
  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth.token;

      if (!token) {
        return next(new Error('No token provided'));
      }

      // Verify JWT
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = decoded; // Attach user info to socket
      socket.userId = decoded.userId;

      console.log(`[SOCKET] User authenticated: ${decoded.userId}`);
      next();
    } catch (error) {
      console.error('[SOCKET] Auth error:', error.message);
      next(new Error('Authentication failed'));
    }
  });

  // ============================================
  // Connection Event
  // ============================================
  io.on('connection', (socket) => {
    const userId = socket.userId;

    // Track active user
    activeUsers[userId] = socket.id;
    console.log(`[SOCKET] ${userId} connected. Active users: ${Object.keys(activeUsers).length}`);

    // ============================================
    // Join Conversation Room
    // ============================================
    socket.on('joinConversation', (conversationId) => {
      socket.join(conversationId);
      console.log(`[SOCKET] User ${userId} joined conversation ${conversationId}`);

      // Notify others in room that user is online
      socket.to(conversationId).emit('userOnline', {
        userId,
        timestamp: new Date()
      });
    });

    // ============================================
    // Leave Conversation Room
    // ============================================
    socket.on('leaveConversation', (conversationId) => {
      socket.leave(conversationId);
      console.log(`[SOCKET] User ${userId} left conversation ${conversationId}`);

      // Notify others
      socket.to(conversationId).emit('userOffline', {
        userId,
        timestamp: new Date()
      });
    });

    // ============================================
    // Send Message (Real-time)
    // ============================================
    socket.on('sendMessage', async (data) => {
      try {
        const { conversationId, text } = data;

        if (!conversationId || !text) {
          socket.emit('error', { message: 'conversationId and text required' });
          return;
        }

        // Save message to database
        const savedMessage = await chatController.saveMessage(
          conversationId,
          userId,
          text
        );

        console.log(`[SOCKET] Message saved: ${conversationId} from ${userId}`);

        // Broadcast to all users in this conversation
        io.to(conversationId).emit('newMessage', {
          _id: savedMessage._id,
          conversationId,
          sender_id: savedMessage.sender_id,
          text: savedMessage.text,
          createdAt: savedMessage.createdAt,
          read: false
        });

        // Increment unread count for recipient
        const otherUserInConversation = await getOtherUserInConversation(conversationId, userId);
        if (otherUserInConversation) {
          await chatController.incrementUnreadCount(conversationId, otherUserInConversation);
        }
      } catch (error) {
        console.error('[SOCKET] Error sending message:', error);
        socket.emit('error', { message: 'Failed to send message' });
      }
    });

    // ============================================
    // Typing Indicator
    // ============================================
    socket.on('typing', (conversationId) => {
      socket.to(conversationId).emit('userTyping', {
        userId,
      });
    });

    socket.on('stopTyping', (conversationId) => {
      socket.to(conversationId).emit('userStoppedTyping', {
        userId,
      });
    });

    // ============================================
    // Mark Messages as Read
    // ============================================
    socket.on('markAsRead', async (conversationId) => {
      try {
        const Conversation = require('../models/Conversation');
        
        await Conversation.findByIdAndUpdate(
          conversationId,
          { read: true }
        );

        // Notify others that messages are read
        socket.to(conversationId).emit('messagesRead', {
          conversationId,
          userId
        });

        console.log(`[SOCKET] Messages marked read: ${conversationId} by ${userId}`);
      } catch (error) {
        console.error('[SOCKET] Error marking as read:', error);
      }
    });

    // ============================================
    // Disconnect Event
    // ============================================
    socket.on('disconnect', () => {
      delete activeUsers[userId];
      console.log(`[SOCKET] User ${userId} disconnected. Active users: ${Object.keys(activeUsers).length}`);
    });
  });
};

// ============================================
// Helper: Get other user in conversation
// ============================================
async function getOtherUserInConversation(conversationId, currentUserId) {
  try {
    const Conversation = require('../models/Conversation');
    const conversation = await Conversation.findById(conversationId);

    if (conversation.student_id.toString() === currentUserId) {
      return conversation.employer_id.toString();
    } else {
      return conversation.student_id.toString();
    }
  } catch (error) {
    console.error('[SOCKET] Error getting other user:', error);
    return null;
  }
}