// File: smart-queue-system/frontend/src/context/AuthContext.jsx
import { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const navigate = useNavigate();

  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem('authToken', newToken);
    navigate('/admin'); // Redirect to admin dashboard after login
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('authToken');
    navigate('/login'); // Redirect to login page after logout
  };
  
  const isLoggedIn = !!token;

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context easily
export const useAuth = () => {
  return useContext(AuthContext);
};