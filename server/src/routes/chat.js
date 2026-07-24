const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const chatController = require('../controllers/chatController');

const router = express.Router();

// ============================================
// GET /api/chat/conversations
// Get all conversations for logged-in user
// ============================================
router.get('/conversations', authMiddleware, chatController.getConversations);

// ============================================
// POST /api/chat/conversations
// Get or create conversation with another user
// Body: { otherUserId, jobId }
// ============================================
router.post('/conversations', authMiddleware, chatController.getOrCreateConversation);

// ============================================
// GET /api/chat/:conversationId/messages
// Get message history for a conversation
// Query: ?page=1&limit=50
// ============================================
router.get('/:conversationId/messages', authMiddleware, chatController.getMessages);

// ============================================
// PUT /api/chat/:conversationId/read
// Mark messages as read
// ============================================
router.put('/:conversationId/read', authMiddleware, chatController.markMessagesAsRead);

module.exports = router;