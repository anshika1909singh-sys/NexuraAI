import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_USERS } from '../data/mockData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const [currentRole, setCurrentRole] = useState(null);

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login'); // 'login' | 'signup'
  const [authModalRole, setAuthModalRole] = useState('student');

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('nexura_user', JSON.stringify(currentUser));
      setCurrentRole(currentUser.role);
    } else {
      localStorage.removeItem('nexura_user');
      setCurrentRole(null);
    }
  }, [currentUser]);

  // Fast demo role switcher
  const switchRole = (role) => {
    if (INITIAL_USERS[role]) {
      setCurrentUser(INITIAL_USERS[role]);
      setCurrentRole(role);
    }
  };

  const login = (email, password, role) => {
    // Check preset or generate custom session
    if (role && INITIAL_USERS[role]) {
      const user = { ...INITIAL_USERS[role], email: email || INITIAL_USERS[role].email };
      setCurrentUser(user);
      setCurrentRole(role);
      setAuthModalOpen(false);
      return { success: true, user };
    }
    // Fallback generic
    const fallbackUser = {
      id: 'usr_' + Date.now(),
      name: email.split('@')[0] || 'User',
      email,
      role: role || 'student',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      ...(INITIAL_USERS[role || 'student'] || {})
    };
    setCurrentUser(fallbackUser);
    setCurrentRole(role || 'student');
    setAuthModalOpen(false);
    return { success: true, user: fallbackUser };
  };

  const signup = (formData) => {
    const role = formData.role || 'student';
    const baseTemplate = INITIAL_USERS[role] || {};
    const newUser = {
      ...baseTemplate,
      id: 'usr_' + Date.now(),
      name: formData.name,
      email: formData.email,
      role: role,
      college: formData.college || baseTemplate.college || 'Apex Institute of Technology',
      company: formData.company || baseTemplate.company || 'Enterprise Partner',
      department: formData.department || baseTemplate.department || 'Engineering',
      avatar: baseTemplate.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    };
    setCurrentUser(newUser);
    setCurrentRole(role);
    setAuthModalOpen(false);
    return { success: true, user: newUser };
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentRole(null);
  };

  const updateProfile = (fields) => {
    setCurrentUser((prev) => {
      const updated = { ...prev, ...fields };
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
        switchRole,
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
