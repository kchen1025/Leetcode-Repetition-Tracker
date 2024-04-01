// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { API } from "@/utils";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/api/current_user")
      .then((response) => {
        if (response) {
          setIsAuthenticated(true);
          setUser(response);
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch(() => setIsAuthenticated(false))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, user }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use authentication status in components
export const useAuth = () => useContext(AuthContext);
