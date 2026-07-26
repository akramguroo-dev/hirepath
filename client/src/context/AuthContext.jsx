import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { setLogoutFunction } from "../api/axios";
import axios from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [user, setUser] = useState(null);

  // Fetch user data on mount
  useEffect(() => {
    if (token) {
      const fetchUser = async () => {
        try {
          const response = await axios.get('/auth/me');
          setUser(response.data.user);
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      };
      fetchUser();
    }
  }, [token]);

  const login = (token, role) => {
    setToken(token);
    setRole(role);
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
  };

  const logout = useCallback(() => {
    setToken(null);
    setRole(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  }, []);

  useEffect(() => {
    setLogoutFunction(logout);
  }, [logout]);

  return (
    <AuthContext.Provider
      value={{
        token,
        role,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);