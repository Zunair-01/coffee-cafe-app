import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from './HomeScreen';
import AddToCartScreen from './tabs/AddToCartScreen';
import WishlistScreen from './tabs/WishlistScreen';
import NotificationsScreen from './tabs/NotificationsScreen';
import { useNotifications } from '../context/NotificationContext';

const BottomTab = createMaterialBottomTabNavigator();

const BottomTabs = () => {
  const { notifications } = useNotifications();

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      activeColor="#cf7844"
      inactiveColor="#999999"
      barStyle={{ backgroundColor: '#121212' }}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={24} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Add to Cart"
        component={AddToCartScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="shopping-cart" color={color} size={24} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Wishlist"
        component={WishlistScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="favorite" color={color} size={24} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="notifications" color={color} size={24} />
          ),
          tabBarBadge: unreadCount > 0 ? unreadCount : null,
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabs;
