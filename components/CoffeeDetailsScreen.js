import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useNotifications } from '../context/NotificationContext';

const CoffeeDetailsScreen = ({ route, navigation }) => {
  const { coffee } = route.params;
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { addNotification } = useNotifications();

  const [isInWishlist, setIsInWishlist] = useState(false);
  const [selectedSize, setSelectedSize] = useState('M');

  const sizePriceAdjustments = {
    S: -0.25,
    M: 0,
    L: 0.35,
  };

  const basePrice = Number(coffee.price);
  const [price, setPrice] = useState(basePrice.toFixed(2));

  useEffect(() => {
    setIsInWishlist(wishlist.some((item) => item.id === coffee.id));
  }, [wishlist]);

  useEffect(() => {
    // Calculate new price based on selected size
    const adjustment = sizePriceAdjustments[selectedSize];
    const adjustedPrice = basePrice * (1 + adjustment);
    setPrice(adjustedPrice.toFixed(2));
  }, [selectedSize]);

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      removeFromWishlist(coffee.id);
      addNotification({
        id: Date.now(),
        message: `${coffee.name} removed from wishlist`,
      });
    } else {
      addToWishlist(coffee);
      addNotification({
        id: Date.now(),
        message: `${coffee.name} added to wishlist`,
      });
    }
    setIsInWishlist(!isInWishlist);
  };

  const handleAddToCart = () => {
    addToCart({ ...coffee, size: selectedSize, price });
    addNotification({
      id: Date.now(),
      message: `${coffee.name} added to cart`,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <Image source={{ uri: coffee.image }} style={styles.image} />
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.heartButton}
        onPress={handleWishlistToggle}>
        <Ionicons
          name={isInWishlist ? 'heart' : 'heart-outline'}
          size={24}
          color={isInWishlist ? 'red' : '#fff'}
        />
      </TouchableOpacity>
      <View style={styles.detailsContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{coffee.name}</Text>
          <View style={styles.iconRow}>
            <View style={styles.iconContainer}>
              <FontAwesome name="coffee" size={16} color="#cf7844" />
              <Text style={styles.iconText}>Coffee</Text>
            </View>
            <View style={styles.iconContainer}>
              <FontAwesome name="tint" size={16} color="#cf7844" />
              <Text style={styles.iconText}>Milk</Text>
            </View>
          </View>
        </View>
        <Text style={styles.subtitle}>{coffee.subtitle}</Text>
        <View style={styles.ratingRow}>
          <View style={styles.ratingContainer}>
            <FontAwesome name="star" size={16} color="#FFD700" />
            <Text style={styles.rating}>{coffee.rating}</Text>
            <Text style={styles.ratingCount}>({coffee.ratingCount})</Text>
          </View>
          <Text style={styles.roastLevel}>Medium Roasted</Text>
        </View>
        <Text style={styles.description}>{coffee.description}</Text>
        <View style={styles.sizeContainer}>
          <Text style={styles.sizeTitle}>Size</Text>
          <View style={styles.sizeOptions}>
            {['S', 'M', 'L'].map((size) => (
              <TouchableOpacity
                key={size}
                style={[
                  styles.sizeButton,
                  selectedSize === size && styles.selectedSizeButton,
                ]}
                onPress={() => setSelectedSize(size)}>
                <Text style={styles.sizeText}>{size}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.footer}>
          <Text style={styles.price}>${price}</Text>
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={handleAddToCart}>
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: '#121212',
  },
  image: {
    width: '100%',
    height: 300,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 10,
  },
  heartButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 10,
  },
  detailsContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#ccc',
    fontSize: 16,
    marginVertical: 8,
  },
  iconRow: {
    flexDirection: 'row',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
  iconText: {
    color: '#fff',
    marginLeft: 5,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  roastLevel: {
    color: '#fff',
    backgroundColor: '#333',
    padding: 5,
    borderRadius: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: 5,
    borderRadius: 5,
  },
  rating: {
    color: '#FFD700',
    marginLeft: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  ratingCount: {
    color: '#ccc',
    marginLeft: 5,
    fontSize: 16,
  },
  description: {
    color: '#ccc',
    marginVertical: 10,
    fontSize: 14,
  },
  sizeContainer: {
    marginVertical: 10,
  },
  sizeTitle: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 5,
  },
  sizeOptions: {
    flexDirection: 'row',
  },
  sizeButton: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  sizeText: {
    color: '#fff',
    fontSize: 14,
  },
  selectedSizeButton: {
    backgroundColor: '#cf7844',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  price: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  addToCartButton: {
    backgroundColor: '#cf7844',
    padding: 15,
    borderRadius: 10,
  },
  addToCartText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CoffeeDetailsScreen;
