import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from './AuthContext';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const loadNotifications = async () => {
      if (currentUser?.id) {
        try {
          const storedNotifications = await AsyncStorage.getItem(
            `notifications_${currentUser.id}`
          );
          if (storedNotifications) {
            setNotifications(JSON.parse(storedNotifications));
          } else {
            setNotifications([]);
          }
        } catch (error) {
          console.error('Failed to load notifications:', error);
        }
      }
    };

    loadNotifications();
  }, [currentUser]);

  useEffect(() => {
    const saveNotifications = async () => {
      if (currentUser?.id) {
        try {
          await AsyncStorage.setItem(
            `notifications_${currentUser.id}`,
            JSON.stringify(notifications)
          );
        } catch (error) {
          console.error('Failed to save notifications:', error);
        }
      }
    };

    saveNotifications();
  }, [notifications, currentUser]);

  const addNotification = (notification) => {
    setNotifications((prev) => [...prev, notification]);
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAsUnread = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: false }
          : notification
      )
    );
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        clearNotifications,
        markAsRead,
        markAsUnread,
      }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
