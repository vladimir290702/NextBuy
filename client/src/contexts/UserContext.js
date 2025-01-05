import React, { createContext, useState, useContext } from "react";

// Create the Context
const UserContext = createContext();

// Provider Component
export function UserProvider({ children }) {
  const [user, setUser] = useState(null); // Store user data here

  const login = (userData) => {
    setUser(userData);
  };

  const register = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout, register }}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook to use the UserContext
export function useUser() {
  return useContext(UserContext);
}
