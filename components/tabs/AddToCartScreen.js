import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../../context/CartContext';

const AddToCartScreen = ({ navigation }) => {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCart();
  const [modalVisible, setModalVisible] = useState(false);

  const calculateTotalPrice = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
        <Text style={styles.sizeText}>Size: {item.size}</Text>
        <View style={styles.quantityContainer}>
          <Text style={styles.itemPrice}>${item.price}</Text>
          <View style={styles.quantityControls}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => decreaseQuantity(item.idWithSize)}>
              <Ionicons name="remove" size={16} color="#ffffff" />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{item.quantity}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => increaseQuantity(item.idWithSize)}>
              <Ionicons name="add" size={16} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => removeFromCart(item.idWithSize)}>
        <Ionicons name="trash-outline" size={20} color="#cf7844" />
      </TouchableOpacity>
    </View>
  );

  const renderOrderSummary = () => (
    <Modal
      transparent={true}
      animationType="slide"
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setModalVisible(false)}>
              <Ionicons name="arrow-back" size={24} color="#ffffff" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Order Summary</Text>
          </View>
          <FlatList
            data={cart}
            renderItem={({ item }) => (
              <View style={styles.modalItemContainer}>
                <Image source={{ uri: item.image }} style={styles.modalImage} />
                <View style={styles.modalDetailsContainer}>
                  <Text style={styles.modalItemName}>{item.name}</Text>
                  <Text style={styles.modalItemSubtitle}>{item.subtitle}</Text>
                  <Text style={styles.modalSizeText}>Size: {item.size}</Text>
                  <Text style={styles.modalItemPrice}>
                    ${item.price} x {item.quantity}
                  </Text>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.idWithSize}
          />
          <TouchableOpacity
            style={styles.proceedButton}
            onPress={() => {
              setModalVisible(false);
              navigation.navigate('AddressScreen');
            }}>
            <Text style={styles.proceedButtonText}>Proceed Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const EmptyCart = () => (
    <View style={styles.emptyCartContainer}>
      <Text style={styles.emptyCartText}>Your cart is empty.</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.idWithSize}
        ListHeaderComponent={<Text style={styles.title}>Cart</Text>}
        ListFooterComponent={
          cart.length > 0 ? (
            <View style={styles.footerContainer}>
              <View style={styles.priceContainer}>
                <Text style={styles.totalPriceText}>Total Price</Text>
                <Text style={styles.totalPrice}>${calculateTotalPrice()}</Text>
              </View>
              <TouchableOpacity
                style={styles.checkoutButton}
                onPress={() => setModalVisible(true)}>
                <Text style={styles.checkoutText}>Check Out</Text>
              </TouchableOpacity>
            </View>
          ) : null
        }
        ListEmptyComponent={<EmptyCart />}
      />
      {renderOrderSummary()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  title: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
    marginBottom: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#282828',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 16,
  },
  detailsContainer: {
    flex: 1,
  },
  itemName: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemSubtitle: {
    color: '#ccc',
    fontSize: 14,
    marginVertical: 8,
  },
  sizeText: {
    color: '#888888',
    fontSize: 14,
    marginVertical: 4,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  itemPrice: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 16,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#cf7844',
    borderRadius: 4,
    padding: 4,
    marginHorizontal: 4,
  },
  quantityText: {
    color: '#ffffff',
    fontSize: 16,
  },
  deleteButton: {
    padding: 8,
    marginLeft: 8,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  priceContainer: {
    alignItems: 'flex-start',
  },
  totalPriceText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
    fontWeight: 'bold',
  },
  totalPrice: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#cf7844',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 16,
    width: '70%',
  },
  checkoutText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#282828',
    borderRadius: 10,
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  modalTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 16,
  },
  modalDetailsContainer: {
    flex: 1,
  },
  modalItemName: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalItemSubtitle: {
    color: '#ccc',
    fontSize: 14,
    marginVertical: 4,
  },
  modalSizeText: {
    color: '#888888',
    fontSize: 14,
    marginVertical: 4,
  },
  modalItemPrice: {
    color: '#ffffff',
    fontSize: 16,
  },
  proceedButton: {
    backgroundColor: '#cf7844',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  proceedButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 350,
  },
});

export default AddToCartScreen;
