import React, { createContext, useState, useEffect, useContext } from 'react';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        let userData = null;

        if (Platform.OS === 'web') {
          userData = localStorage.getItem('currentUser');
        } else {
          userData = await AsyncStorage.getItem('currentUser');
        }

        if (userData) {
          setCurrentUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Failed to load user data:', error);
      }
    };

    loadUser();
  }, []);

  const login = async (user) => {
    setCurrentUser(user);

    if (Platform.OS === 'web') {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      await AsyncStorage.setItem('currentUser', JSON.stringify(user));
    }
  };

  const logout = async () => {
    if (Platform.OS === 'web') {
      localStorage.removeItem('currentUser');
    } else {
      await AsyncStorage.removeItem('currentUser');
    }
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
