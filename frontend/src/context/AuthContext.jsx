import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('cloud_storage_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('cloud_storage_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      authService.getCurrentUser()
        .then((userData) => {
          setUser(userData);
          localStorage.setItem('cloud_storage_user', JSON.stringify(userData));
        })
        .catch(() => {
          logout();
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = async (email, password) => {
    const res = await authService.login(email, password);
    setToken(res.token);
    setUser(res.user);
    localStorage.setItem('cloud_storage_token', res.token);
    localStorage.setItem('cloud_storage_user', JSON.stringify(res.user));
    return res;
  };

  const register = async (fullName, email, password) => {
    const res = await authService.register(fullName, email, password);
    setToken(res.token);
    setUser(res.user);
    localStorage.setItem('cloud_storage_token', res.token);
    localStorage.setItem('cloud_storage_user', JSON.stringify(res.user));
    return res;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('cloud_storage_token');
    localStorage.removeItem('cloud_storage_user');
  };

  const refreshUserData = async () => {
    try {
      const userData = await authService.getCurrentUser();
      setUser(userData);
      localStorage.setItem('cloud_storage_user', JSON.stringify(userData));
    } catch (e) {
      // Ignore error
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, refreshUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
