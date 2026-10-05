import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const loadWishlist = async () => {
      if (currentUser?.id) {
        try {
          const storedWishlist = await AsyncStorage.getItem(
            `wishlist_${currentUser.id}`
          );
          if (storedWishlist) {
            setWishlist(JSON.parse(storedWishlist));
          } else {
            setWishlist([]);
          }
        } catch (error) {
          console.error('Failed to load wishlist:', error);
        }
      }
    };

    loadWishlist();
  }, [currentUser]);

  useEffect(() => {
    const saveWishlist = async () => {
      if (currentUser?.id) {
        try {
          await AsyncStorage.setItem(
            `wishlist_${currentUser.id}`,
            JSON.stringify(wishlist)
          );
        } catch (error) {
          console.error('Failed to save wishlist:', error);
        }
      }
    };

    saveWishlist();
  }, [wishlist, currentUser]);

  const addToWishlist = (item) => {
    setWishlist((prev) => [...prev, item]);
  };

  const removeFromWishlist = (itemId) => {
    setWishlist((prev) => prev.filter((item) => item.id !== itemId));
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
