import React, { createContext, useContext, useEffect, useState } from 'react';
import { apiRequest } from '../api/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentRole, setCurrentRole] = useState(null);

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login');
  const [authModalRole, setAuthModalRole] = useState('student');

  // Restore login session when the app starts
  useEffect(() => {
    const savedUser = localStorage.getItem('nexura_user');
    const savedToken = localStorage.getItem('nexura_token');

    if (savedUser && savedToken) {
      try {
        const user = JSON.parse(savedUser);

        setCurrentUser(user);
        setCurrentRole(user.role);
      } catch (error) {
        console.error('Failed to restore user session:', error);

        localStorage.removeItem('nexura_user');
        localStorage.removeItem('nexura_token');
      }
    }
  }, []);

  // Login using backend
  const login = async (email, password, role) => {
    try {
      const data = await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
        }),
      });

      // Make sure the selected frontend role matches
      // the role stored in the database.
      if (role && data.user.role !== role) {
        return {
          success: false,
          message: `This account is registered as ${data.user.role}.`,
        };
      }

      localStorage.setItem('nexura_token', data.token);
      localStorage.setItem('nexura_user', JSON.stringify(data.user));

      setCurrentUser(data.user);
      setCurrentRole(data.user.role);
      setAuthModalOpen(false);

      return {
        success: true,
        user: data.user,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  };

  // Register using backend
  const signup = async (formData) => {
    try {
      const role = formData.role || 'student';

      // Admin cannot register
      if (role === 'admin') {
        return {
          success: false,
          message: 'Admin accounts cannot be registered publicly.',
        };
      }

      const data = await apiRequest('/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role,
        }),
      });

      /*
       * Registration creates the account.
       *
       * We do NOT automatically log the user in here.
       * The user will need to log in with their new credentials.
       */
      setAuthModalMode('login');

      return {
        success: true,
        user: data.user,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('nexura_token');
    localStorage.removeItem('nexura_user');

    setCurrentUser(null);
    setCurrentRole(null);
  };

  /*
   * Profile update is temporarily local.
   *
   * We will connect this to:
   * PATCH /api/users/me
   *
   * when we build the User Profile API.
   */
  const updateProfile = (fields) => {
    setCurrentUser((prev) => {
      if (!prev) return prev;

      const updated = {
        ...prev,
        ...fields,
      };

      localStorage.setItem('nexura_user', JSON.stringify(updated));

      return updated;
    });
  };

  const openAuth = (mode = 'login', role = 'student') => {
    setAuthModalMode(mode);
    setAuthModalRole(role);
    setAuthModalOpen(true);
  };

  const closeAuth = () => {
    setAuthModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        currentRole,
        login,
        signup,
        logout,
        updateProfile,
        authModalOpen,
        authModalMode,
        authModalRole,
        openAuth,
        closeAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);