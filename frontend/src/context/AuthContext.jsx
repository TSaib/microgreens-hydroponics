import React, { createContext, useContext, useState } from 'react';

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  // login function sets user info (now includes email and role)
  const login = (email, role) => {
    const userObj = { email, role };
    setUser(userObj);
    localStorage.setItem('user', JSON.stringify(userObj));
  };

  // Optionally, add a logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
