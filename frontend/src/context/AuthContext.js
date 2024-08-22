import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(() => {
    // Retrieve stored auth state from localStorage
    const savedAuthState = localStorage.getItem('authState');
    return savedAuthState ? JSON.parse(savedAuthState) : { name: '', role: '' };
  });

  useEffect(() => {
    // Store auth state in localStorage whenever it changes
    localStorage.setItem('authState', JSON.stringify(authState));
  }, [authState]);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};
