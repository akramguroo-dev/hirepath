import { io } from 'socket.io-client';

// Get token from localStorage
const getToken = () => {
  return localStorage.getItem('token');
};

// Create Socket.io connection
const socket = io(import.meta.env.VITE_SOCKET_URL || 'https://hirepath-api.onrender.com', {
  auth: {
    token: getToken()
  },
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 5
});

// Connection events
socket.on('connect', () => {
  console.log('[SOCKET] Connected to server:', socket.id);
});

socket.on('disconnect', () => {
  console.log('[SOCKET] Disconnected from server');
});

socket.on('error', (error) => {
  console.error('[SOCKET] Error:', error);
});

export default socket;