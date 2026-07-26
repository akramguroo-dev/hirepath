import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "../api/axios";

export default function ChatWindow({
  conversationId,
  socket,
  onClose,
  onMessagesRead,
}) {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState(null);
  const [conversation, setConversation] = useState(null);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  // Scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load message history on conversation change
  useEffect(() => {
    if (!conversationId) return;

    const loadMessages = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/chat/${conversationId}/messages`, {
          params: { limit: 50 },
        });
        setMessages(response.data);
      } catch (error) {
        console.error("Error loading messages:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMessages();

    // Mark messages as read when opening this conversation
    axios
      .put(`/chat/${conversationId}/read`)
      .then(() => onMessagesRead?.())
      .catch((err) => console.error("Error marking as read:", err));

    // Socket.io: Join conversation room
    if (socket) {
      socket.emit("joinConversation", conversationId);
    }

    return () => {
      if (socket) {
        socket.emit("leaveConversation", conversationId);
      }
    };
  }, [conversationId, socket]);

  // Listen for real-time messages
  useEffect(() => {
    if (!socket) return;

    socket.on("newMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    socket.on("userTyping", (data) => {
      setTypingUser(data.userName);
    });

    socket.on("userStoppedTyping", () => {
      setTypingUser(null);
    });

    return () => {
      socket.off("newMessage");
      socket.off("userTyping");
      socket.off("userStoppedTyping");
    };
  }, [socket]);

  // Handle send message
  const handleSendMessage = () => {
    if (!inputText.trim() || !socket) return;

    socket.emit("sendMessage", {
      conversationId,
      text: inputText,
    });

    setInputText("");
    socket.emit("stopTyping", conversationId);
    setIsTyping(false);
  };

  // Handle typing indicator
  const handleInputChange = (e) => {
    setInputText(e.target.value);

    if (!isTyping && socket) {
      setIsTyping(true);
      socket.emit("typing", conversationId);
    }

    // Clear existing timeout
    clearTimeout(typingTimeoutRef.current);

    // Set new timeout to stop typing indicator
    typingTimeoutRef.current = setTimeout(() => {
      if (socket) {
        socket.emit("stopTyping", conversationId);
      }
      setIsTyping(false);
    }, 3000);
  };

  // Handle Enter key to send
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!conversationId) {
    return (
      <div className="w-full h-full flex items-center justify-center text-gray-400">
        <p>Select a conversation to start messaging</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="animate-spin">
          <svg
            className="w-8 h-8 text-[#00A5EC]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Chat</h2>
          <p className="text-xs text-gray-400 mt-1">
            {messages.length} messages
          </p>
        </div>
        <button
          onClick={onClose}
          className="md:hidden text-gray-400 hover:text-gray-600 p-2"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message._id}
              className={`flex ${
                message.sender_id?._id === user?._id
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.sender_id?._id === user?._id
                    ? "bg-[#00A5EC] text-white rounded-br-none"
                    : "bg-gray-100 text-gray-900 rounded-bl-none"
                }`}
              >
                {message.sender_id?._id !== user?._id && (
                  <p className="text-xs font-semibold text-gray-500 mb-1">
                    {message.sender_id?.name}
                  </p>
                )}
                <p className="text-sm break-words">{message.text}</p>
                <span
                  className={`text-xs mt-1 block ${
                    message.sender_id?._id === user?._id
                      ? "text-blue-100"
                      : "text-gray-400"
                  }`}
                >
                  {new Date(message.createdAt).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))
        )}

        {/* Typing Indicator */}
        {typingUser && (
          <div className="flex justify-start">
            <div className="bg-gray-100 px-4 py-2 rounded-lg rounded-bl-none">
              <p className="text-sm text-gray-600">{typingUser} is typing</p>
              <div className="flex gap-1 mt-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-100 bg-white">
        <div className="flex gap-3">
          <textarea
            value={inputText}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            rows="3"
            className="flex-1 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A5EC] focus:border-transparent resize-none"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            className="px-4 py-3 bg-[#00A5EC] text-white rounded-lg font-semibold hover:bg-[#0095D8] disabled:opacity-50 disabled:cursor-not-allowed transition-colors self-end"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,18.1272231 C0.8376543,18.9127101 0.99,19.5986023 1.77946707,20 C2.41,20.1571 3.50612381,19.7429026 4.13399899,19.3286049 L17.1272231,14.0151496 C17.1272231,14.0151496 17.1272231,14.0151496 17.4411606,13.5741566 C17.4411606,13.5741566 17.4411606,13.5741566 17.1272231,13.0744987 L4.13399899,7.76104327 C3.34915502,7.34684589 2.40612381,7.19026239 1.77946707,7.19026239 C0.994623095,7.50920245 0.837654304,8.29574803 1.15159189,9.08229361 L3.03521743,13.5741566 C3.03521743,13.5741566 3.19218622,13.7312539 3.50612381,13.7312539 L16.6915026,14.5167409 C16.6915026,14.5167409 17.1272231,14.5167409 17.1272231,14.0744987 L17.1272231,12.6315722 C17.1272231,12.0456801 16.6915026,12.4744748 16.6915026,12.4744748 Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
