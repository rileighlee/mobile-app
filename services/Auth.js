import React, { createContext, useState } from 'react';

// Create context for authentication
export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const saveToken = (userToken) => {
    setToken(userToken);
  };

  return (
    <AuthContext.Provider value={{ token, saveToken }}>
      {children}
    </AuthContext.Provider>
  );
};
