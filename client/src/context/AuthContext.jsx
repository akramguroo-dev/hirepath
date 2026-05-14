import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { setLogoutFunction } from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));

  const login = (token, role) => {
    setToken(token);
    setRole(role);

    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
  };

  const logout = useCallback(() => {
    setToken(null);
    setRole(null);
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
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);