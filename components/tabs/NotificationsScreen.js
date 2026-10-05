import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useNotifications } from '../../context/NotificationContext';

const NotificationsScreen = () => {
  const { notifications, markAsRead, markAsUnread, clearNotifications } =
    useNotifications();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.notification, item.isRead ? styles.read : styles.unread]}
      onPress={() => markAsRead(item.id)}
      onLongPress={() => markAsUnread(item.id)}>
      <Text style={styles.text}>{item.message}</Text>
    </TouchableOpacity>
  );

  const EmptyNotifications = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No notifications available.</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<EmptyNotifications />}
      />
      <TouchableOpacity style={styles.clearButton} onPress={clearNotifications}>
        <Text style={styles.clearButtonText}>Clear All Notifications</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 16,
  },
  notification: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  read: {
    backgroundColor: '#333',
  },
  unread: {
    backgroundColor: '#cf7844',
  },
  text: {
    color: '#ffffff',
  },
  clearButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#cf7844',
    borderRadius: 8,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 350,
  },
});

export default NotificationsScreen;
