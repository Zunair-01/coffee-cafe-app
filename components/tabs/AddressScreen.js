import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useCart } from '../../context/CartContext';

const AddressScreen = ({ navigation }) => {
  const { cart, clearCart, getTotalPrice, getTotalItems, currentUserId } =
    useCart();
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');

  const handleProceed = async () => {
    if (!address || !contact) {
      alert('Please fill in all fields');
      return;
    }

    const orderData = {
      userId: currentUserId,
      address,
      contact,
      items: cart,
      totalPrice: getTotalPrice(),
      totalItems: getTotalItems(),
    };

    try {
      const response = await fetch(
        'https://coffeecafeproject-a768d-default-rtdb.firebaseio.com/orders.json',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderData),
        }
      );
      const data = await response.json();

      setAddress('');
      setContact('');
      clearCart();

      navigation.navigate('OrderSuccess');
    } catch (error) {
      console.error('Error storing order:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Address:</Text>
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={setAddress}
        placeholder="Enter your address"
      />
      <Text style={styles.label}>Contact Number:</Text>
      <TextInput
        style={styles.input}
        value={contact}
        onChangeText={setContact}
        placeholder="Enter your contact number"
        keyboardType="phone-pad"
      />
      <TouchableOpacity style={styles.button} onPress={handleProceed}>
        <Text style={styles.buttonText}>Proceed to Payment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#1a1a1a',
  },
  label: {
    color: '#ffffff',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#282828',
    color: '#ffffff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#cf7844',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AddressScreen;
