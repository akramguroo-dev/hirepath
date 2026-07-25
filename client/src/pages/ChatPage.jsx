import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from '../api/axios';
import socket from '../utils/socket';
import ChatList from '../components/ChatList';
import ChatWindow from '../components/ChatWindow';

export default function ChatPage() {
  const { token, user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch conversations on mount
  useEffect(() => {
    if (!token) return;

    const fetchConversations = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/chat/conversations');
        setConversations(response.data);
      } catch (error) {
        console.error('Error fetching conversations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, [token]);

  // Listen for real-time conversation updates
  useEffect(() => {
    if (!socket) return;

    socket.on('newMessage', (message) => {
      // Update the conversation's last message
      setConversations(prev =>
        prev.map(conv =>
          conv._id === message.conversationId
            ? {
                ...conv,
                last_message: message.text,
                last_message_at: message.createdAt
              }
            : conv
        )
      );
    });

    return () => {
      socket.off('newMessage');
    };
  }, []);

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Please login to access messages</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto h-screen flex">
        {/* Chat List - Left Sidebar */}
        <div className={`w-full md:w-80 bg-white border-r border-gray-100 ${selectedConversationId ? 'hidden md:block' : ''}`}>
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin">
                <svg className="w-8 h-8 text-[#00A5EC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
            </div>
          ) : (
            <ChatList
              conversations={conversations}
              onSelectConversation={(id) => setSelectedConversationId(id)}
              selectedConversationId={selectedConversationId}
            />
          )}
        </div>

        {/* Chat Window - Main Area */}
        <div className={`flex-1 bg-white ${!selectedConversationId ? 'hidden md:flex' : 'flex'} flex-col`}>
          {selectedConversationId ? (
            <ChatWindow
              conversationId={selectedConversationId}
              socket={socket}
              onClose={() => setSelectedConversationId(null)}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <div className="text-center">
                <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <p>Select a conversation to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}