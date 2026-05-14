import axios from 'axios';
import toast from "react-hot-toast";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

let logoutFn = null;

export const setLogoutFunction = (fn) => {
  logoutFn = fn;
};

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (logoutFn) {
        logoutFn();
        toast.error("Session expired. Please log in again.");
      }
    }
    return Promise.reject(error);
  }
);

export default API;