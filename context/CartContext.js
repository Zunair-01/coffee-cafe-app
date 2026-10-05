import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const loadCart = async () => {
      if (currentUser?.id) {
        try {
          const storedCart = await AsyncStorage.getItem(
            `cart_${currentUser.id}`
          );
          if (storedCart) {
            setCart(JSON.parse(storedCart));
          }
        } catch (error) {
          console.error('Failed to load cart:', error);
        }
      }
    };

    loadCart();
  }, [currentUser]);

  useEffect(() => {
    const saveCart = async () => {
      if (currentUser?.id) {
        try {
          await AsyncStorage.setItem(
            `cart_${currentUser.id}`,
            JSON.stringify(cart)
          );
        } catch (error) {
          console.error('Failed to save cart:', error);
        }
      }
    };

    saveCart();
  }, [cart, currentUser]);

  const addToCart = (item) => {
    const itemIdWithSize = `${item.id}-${item.size}`;
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) => cartItem.idWithSize === itemIdWithSize
      );
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.idWithSize === itemIdWithSize
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [
          ...prevCart,
          { ...item, idWithSize: itemIdWithSize, quantity: 1 },
        ];
      }
    });
  };

  const removeFromCart = (idWithSize) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.idWithSize !== idWithSize)
    );
  };

  const increaseQuantity = (idWithSize) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.idWithSize === idWithSize
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (idWithSize) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.idWithSize === idWithSize && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalPrice = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
        currentUserId: currentUser?.id,
      }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
