import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from '../api/axios';

export default function ChatList({ conversations, onSelectConversation, selectedConversationId }) {
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [conversations]);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="animate-spin">
          <svg className="w-8 h-8 text-[#00A5EC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </div>
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
        <svg className="w-16 h-16 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <p className="text-center">No conversations yet</p>
        <p className="text-sm text-gray-300 mt-2">Apply to a job to start chatting with employers</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="p-4 border-b border-gray-100">
        <h2 className="text-lg font-bold text-gray-900">Messages</h2>
        <p className="text-xs text-gray-400 mt-1">{conversations.length} conversation{conversations.length !== 1 ? 's' : ''}</p>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {conversations.map((conversation) => (
          <div
            key={conversation._id}
            onClick={() => onSelectConversation(conversation._id)}
            className={`p-4 border-b border-gray-50 cursor-pointer transition-colors ${
              selectedConversationId === conversation._id
                ? 'bg-blue-50 border-l-4 border-l-[#00A5EC]'
                : 'hover:bg-gray-50'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-gray-900 truncate">
                    {conversation.student_id?.name === 'You' 
                      ? conversation.employer_id?.name 
                      : conversation.student_id?.name}
                  </h3>
                  {(conversation.unread_count_student > 0 || conversation.unread_count_employer > 0) && (
                    <span className="bg-[#00A5EC] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {conversation.unread_count_student || conversation.unread_count_employer}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                  {conversation.job_id?.title && `${conversation.job_id.title} at ${conversation.job_id.company}`}
                </p>
                <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                  {conversation.last_message || 'No messages yet'}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-[11px] text-gray-400">
                  {conversation.last_message_at ? formatTime(conversation.last_message_at) : ''}
                </span>
                {(conversation.unread_count_student > 0 || conversation.unread_count_employer > 0) && (
                  <div className="w-2 h-2 bg-[#00A5EC] rounded-full"></div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Helper: Format time
function formatTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'now';
  if (diffMins < 60) return `${diffMins}m`;
  if (diffHours < 24) return `${diffHours}h`;
  if (diffDays < 7) return `${diffDays}d`;
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}