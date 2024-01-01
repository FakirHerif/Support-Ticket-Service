import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(JSON.parse(storedToken));
    }
  }, []);

  const handleLogin = (username, authToken, userRole) => {
    setToken(authToken);
    localStorage.setItem('token', JSON.stringify(authToken));
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  const instance = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.request.use(
    (config) => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        config.headers.Authorization = `Bearer ${storedToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

const storedToken = localStorage.getItem('token');
const decodedToken = storedToken ? JSON.parse(atob(storedToken.split('.')[1])) : null;
const username = decodedToken ? decodedToken.username : null;
const userRole = decodedToken ? decodedToken.role : null;


console.log("TOKEN:", storedToken)
console.log("userRole:", userRole)
console.log("username:", username)

  return (
    <AuthContext.Provider
      value={{
        user: username,
        token,
        role: userRole,
        handleLogin,
        handleLogout,
        axios: instance, // Axios instance'i context içine ekledim
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
