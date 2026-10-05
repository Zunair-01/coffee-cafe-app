import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Button,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

const ProfileScreen = ({ navigation }) => {
  const { currentUser, logout } = useAuth();
  const [userData, setUserData] = useState(null);
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser && currentUser.id) {
        try {
          const userResponse = await fetch(
            `https://coffeecafeproject-a768d-default-rtdb.firebaseio.com/users/${currentUser.id}.json`
          );
          if (!userResponse.ok) {
            throw new Error('Failed to fetch user data');
          }
          const userData = await userResponse.json();
          setUserData(userData);

          const orderResponse = await fetch(
            `https://coffeecafeproject-a768d-default-rtdb.firebaseio.com/orders.json`
          );
          if (!orderResponse.ok) {
            throw new Error('Failed to fetch order data');
          }
          const orders = await orderResponse.json();
          const userOrder = Object.values(orders).find(
            (order) => order.userId === currentUser.id
          );
          setContactNumber(
            userOrder?.contact || 'Contact number not available'
          );
          setAddress(userOrder?.address || 'Address not available');
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [currentUser]);

  const handleLogout = () => {
    logout();
    Alert.alert('Logged Out', 'You have been logged out.', [
      { text: 'OK', onPress: () => navigation.navigate('Login') },
    ]);
  };

  const handleDeleteAccount = async () => {
    setModalVisible(false);
    try {
      await fetch(
        `https://coffeecafeproject-a768d-default-rtdb.firebaseio.com/users/${currentUser.id}.json`,
        {
          method: 'DELETE',
        }
      );
      Alert.alert('Account Deleted', 'Your account has been deleted.', [
        {
          text: 'OK',
          onPress: () => {
            logout();
            navigation.navigate('Login');
          },
        },
      ]);
    } catch (err) {
      Alert.alert('Error', 'Failed to delete account. Please try again.');
    }
  };

  if (loading) {
    return (
      <Modal transparent={true} visible={loading} animationType="none">
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#cf7844" />
          <Text style={styles.loaderText}>Loading...</Text>
        </View>
      </Modal>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Error: {error}</Text>
      </View>
    );
  }

  if (!currentUser) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Please log in to view your profile.</Text>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const avatarInitial = userData?.username?.charAt(0).toUpperCase() || 'U';

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.title}>{userData?.username || 'User'}</Text>
      </View>

      <View style={styles.profileContainer}>
        <View style={styles.avatarWrapper}>
          <Text style={styles.avatarText}>{avatarInitial}</Text>
        </View>

        <View style={styles.userInfo}>
          <View style={styles.infoItem}>
            <Text style={styles.infoText}>
              {userData?.username || 'Name not available'}
            </Text>
            <View style={styles.underline} />
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoText}>{contactNumber}</Text>
            <View style={styles.underline} />
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoText}>{address}</Text>
            <View style={styles.underline} />
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoText}>
              {userData?.email || 'Email not available'}
            </Text>
            <View style={styles.underline} />
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.deleteButtonText}>Delete Account</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Are you sure you want to delete your account?
            </Text>
            <View style={styles.modalButtons}>
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
              <Button
                title="OK"
                color="#cf7844"
                onPress={handleDeleteAccount}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 1)',
  },
  loaderText: {
    marginTop: 10,
    color: '#cf7844',
    fontSize: 16,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: 0,
    padding: 8,
  },
  title: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '600',
    paddingTop: 25,
  },
  profileContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatarWrapper: {
    backgroundColor: '#282828',
    borderRadius: 60,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  userInfo: {
    width: '100%',
  },
  infoItem: {
    marginBottom: 20,
  },
  infoText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 5,
  },
  underline: {
    height: 1,
    backgroundColor: '#ffffff',
    width: '100%',
  },
  logoutButton: {
    backgroundColor: '#cf7844',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 30,
  },
  logoutButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#cf7844',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 30,
  },
  loginButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
  },
  deleteButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default ProfileScreen;
