import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSearch } from '../context/SearchContext';
import { useAuth } from '../context/AuthContext';

const menuItems = [
  { id: '1', name: 'Profile', icon: 'person' },
  { id: '2', name: 'Add to Cart', icon: 'shopping-cart' },
  { id: '3', name: 'Wishlist', icon: 'favorite' },
  { id: '4', name: 'Logout', icon: 'logout' },
];

const Header = ({ navigation, profileIcon }) => {
  const { searchQuery, setSearchQuery } = useSearch();
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [visibleItems, setVisibleItems] = useState({ start: 0, end: 2 });
  const [scrollOffset, setScrollOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser && currentUser.id) {
        try {
          const response = await fetch(
            `https://coffeecafeproject-a768d-default-rtdb.firebaseio.com/users/${currentUser.id}.json`
          );
          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }
          const data = await response.json();
          setUserData(data);
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

  const updateVisibleItems = (offset) => {
    const itemsCount = menuItems.length;
    if (offset < 0) {
      // Scrolling up
      setVisibleItems((prev) => {
        const newStart = Math.max(prev.start - 2, 0);
        return {
          start: newStart,
          end: Math.min(newStart + 2, itemsCount),
        };
      });
    } else if (offset > 0) {
      // Scrolling down
      setVisibleItems((prev) => {
        const newEnd = Math.min(prev.end + 2, itemsCount);
        return {
          start: Math.max(newEnd - 2, 0),
          end: newEnd,
        };
      });
    }
  };

  const handleScroll = useCallback(
    (event) => {
      const offsetY = event.nativeEvent.contentOffset.y;
      updateVisibleItems(offsetY - scrollOffset);
      setScrollOffset(offsetY);
    },
    [scrollOffset]
  );

  const handleLogout = () => {
    alert('You have been logged out.');
    navigation.navigate('Login');
  };

  const handleMenuItemPress = (route) => {
    if (route === 'Profile') {
      navigation.navigate('ProfileScreen');
    } else if (route === 'Logout') {
      handleLogout();
    } else {
      navigation.navigate(route);
    }
    setIsMenuVisible(false);
  };

  const renderMenuItem = ({ item }) => (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => handleMenuItemPress(item.name)}>
      <Icon name={item.icon} size={20} color="#fff" style={styles.menuIcon} />
      <Text style={styles.menuText}>{item.name}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.headerContainer}>
        <ActivityIndicator size="large" color="#cf7844" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Error: {error}</Text>
      </View>
    );
  }

  const avatarInitial = userData?.username?.charAt(0).toUpperCase() || 'U';

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerTop}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => setIsMenuVisible(!isMenuVisible)}>
          <View style={styles.dotContainer}>
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
          <View style={styles.avatarWrapper}>
            <Text style={styles.avatarText}>{avatarInitial}</Text>
          </View>
        </TouchableOpacity>
      </View>
      {isMenuVisible && (
        <View style={styles.dropdownMenu}>
          <ScrollView
            contentContainerStyle={styles.menuList}
            showsVerticalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}>
            <FlatList
              data={menuItems.slice(visibleItems.start, visibleItems.end)}
              keyExtractor={(item) => item.id}
              renderItem={renderMenuItem}
            />
          </ScrollView>
        </View>
      )}
      <View style={styles.headerBottom}>
        <Text style={styles.title}>Find the best coffee for you</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Find Your Coffee..."
          placeholderTextColor="#666"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#121212',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  iconButton: {
    padding: 10,
  },
  dotContainer: {
    width: 24,
    height: 24,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: '#ffffff',
    borderRadius: 4,
    margin: 1,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 60,
    left: 16,
    backgroundColor: '#1f1f1f',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: 160,
    maxHeight: Dimensions.get('window').height * 0.3,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    zIndex: 1000,
  },
  menuList: {
    paddingBottom: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  menuIcon: {
    marginRight: 10,
  },
  menuText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  headerBottom: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  title: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 12,
    color: '#fff',
  },
  avatarWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#555',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Header;
