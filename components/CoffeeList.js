import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useCart } from '../context/CartContext'; // Adjust the path as needed
import { useSearch } from '../context/SearchContext';
import { useNotifications } from '../context/NotificationContext';

const CoffeeList = ({ tabName, navigation }) => {
  const { addNotification } = useNotifications();
  const { addToCart } = useCart();
  const { searchQuery } = useSearch();

  const coffeeData = [
    {
      id: '1',
      name: 'Cappuccino',
      subtitle: 'With Steamed Milk',
      image:
        'https://img.freepik.com/premium-photo/cappuccino-italian-style-milk-coffee-hot-beverage-drink_1061358-30242.jpg',
      rating: '4.5',
      ratingCount: 'N/A',
      description:
        'Cappuccino is a latte made with more foam than steamed milk, often with a sprinkle of cocoa powder or cinnamon on top.',
      price: '4.20',
    },
    {
      id: '2',
      name: 'Cappuccino',
      subtitle: 'With Foam',
      image:
        'https://img.freepik.com/premium-photo/cup-steaming-cappuccino-with-heart-shaped-foam-top_962751-2223.jpg',
      rating: '4.2',
      ratingCount: 'N/A',
      description:
        'Cappuccino with a layer of frothy foam on top, creating a creamy texture and rich flavor.',
      price: '4.20',
    },
    {
      id: '3',
      name: 'Cappuccino',
      subtitle: 'With Vanilla Syrup',
      image:
        'https://img.freepik.com/premium-photo/creative-trendy-bubble-tea-cup-packaging-design-concepts-featuring-aesthetic-scenic-beauty_655090-188161.jpg',
      rating: '4.0',
      ratingCount: 'N/A',
      description:
        'Cappuccino with a hint of vanilla syrup for a sweet and aromatic twist.',
      price: '4.50',
    },
    {
      id: '4',
      name: 'Cappuccino',
      subtitle: 'With Caramel Drizzle',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7ABr1zCfXzC2nsV6prs5urW6kVeiJ6LjsGg&s',
      rating: '4.3',
      ratingCount: 'N/A',
      description:
        'Cappuccino topped with a rich caramel drizzle for an indulgent treat.',
      price: '4.70',
    },
    {
      id: '5',
      name: 'Cappuccino',
      subtitle: 'With Hazelnut Flavor',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzgkugL2AodbP3zNmsCeV9yul4nqNojVP-cA&s',
      rating: '4.4',
      ratingCount: 'N/A',
      description:
        'Cappuccino infused with hazelnut flavor for a nutty and sweet experience.',
      price: '4.60',
    },
    {
      id: '6',
      name: 'Espresso',
      subtitle: 'With Steamed Milk',
      image:
        'https://img.freepik.com/free-photo/coffee-ai-generated_23-2150691619.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1720483200&semt=ais_hybrid',
      rating: '4.0',
      ratingCount: 'N/A',
      description: 'Beans used for making Cappuccino with steamed milk.',
      price: '4.20',
    },
    {
      id: '7',
      name: 'Espresso',
      subtitle: 'Classic Italian Espresso',
      image:
        'https://img.freepik.com/premium-photo/espresso-coffee_1061358-30302.jpg',
      rating: '4.6',
      ratingCount: 'N/A',
      description:
        'A rich and intense coffee brewed by forcing hot water through finely-ground coffee beans.',
      price: '3.50',
    },
    {
      id: '8',
      name: 'Espresso',
      subtitle: 'Double Shot Espresso',
      image:
        'https://img.freepik.com/premium-photo/double-espresso_1061358-30303.jpg',
      rating: '4.7',
      ratingCount: 'N/A',
      description:
        'A double shot of rich and bold espresso for those who need an extra kick.',
      price: '4.00',
    },
    {
      id: '9',
      name: 'Espresso',
      subtitle: 'Vanilla Espresso',
      image:
        'https://img.freepik.com/premium-photo/vanilla-espresso_1061358-30304.jpg',
      rating: '4.5',
      ratingCount: 'N/A',
      description:
        'Espresso with a hint of vanilla for a sweet and aromatic flavor.',
      price: '3.70',
    },
    {
      id: '10',
      name: 'Espresso',
      subtitle: 'Caramel Espresso',
      image:
        'https://img.freepik.com/premium-photo/caramel-espresso_1061358-30305.jpg',
      rating: '4.6',
      ratingCount: 'N/A',
      description:
        'Espresso with a drizzle of caramel syrup for a rich and indulgent taste.',
      price: '3.80',
    },
    {
      id: '11',
      name: 'Espresso',
      subtitle: 'Hazelnut Espresso',
      image:
        'https://img.freepik.com/premium-photo/hazelnut-espresso_1061358-30306.jpg',
      rating: '4.8',
      ratingCount: 'N/A',
      description:
        'Espresso with a touch of hazelnut flavor for a nutty and sweet experience.',
      price: '3.90',
    },
    {
      id: '12',
      name: 'Americano',
      subtitle: 'Classic Americano',
      image:
        'https://img.freepik.com/free-photo/americano-coffee_1061358-30303.jpg',
      rating: '4.4',
      ratingCount: 'N/A',
      description:
        'A diluted espresso with hot water, offering a lighter and smoother taste.',
      price: '3.70',
    },
    {
      id: '13',
      name: 'Americano',
      subtitle: 'Americano with Milk',
      image:
        'https://img.freepik.com/free-photo/americano-with-milk_1061358-30309.jpg',
      rating: '4.5',
      ratingCount: 'N/A',
      description:
        'Americano coffee with a splash of milk for a creamier texture.',
      price: '3.80',
    },
    {
      id: '14',
      name: 'Americano',
      subtitle: 'Americano with Vanilla',
      image:
        'https://img.freepik.com/free-photo/americano-with-vanilla_1061358-30310.jpg',
      rating: '4.6',
      ratingCount: 'N/A',
      description:
        'Americano with a touch of vanilla syrup for a sweet flavor.',
      price: '3.90',
    },
    {
      id: '15',
      name: 'Americano',
      subtitle: 'Caramel Americano',
      image:
        'https://img.freepik.com/free-photo/caramel-americano_1061358-30311.jpg',
      rating: '4.4',
      ratingCount: 'N/A',
      description:
        'Americano with caramel syrup for a rich and sweet experience.',
      price: '4.00',
    },
    {
      id: '16',
      name: 'Americano',
      subtitle: 'Hazelnut Americano',
      image:
        'https://img.freepik.com/free-photo/hazelnut-americano_1061358-30312.jpg',
      rating: '4.5',
      ratingCount: 'N/A',
      description:
        'Americano with a hint of hazelnut flavor for a nutty twist.',
      price: '4.10',
    },
    {
      id: '17',
      name: 'Macchiato',
      subtitle: 'Classic Macchiato',
      image:
        'https://img.freepik.com/free-photo/macchiato-coffee_1061358-30313.jpg',
      rating: '4.5',
      ratingCount: 'N/A',
      description:
        'An espresso topped with a small amount of steamed milk or foam.',
      price: '3.60',
    },
    {
      id: '18',
      name: 'Macchiato',
      subtitle: 'Caramel Macchiato',
      image:
        'https://img.freepik.com/free-photo/caramel-macchiato_1061358-30314.jpg',
      rating: '4.7',
      ratingCount: 'N/A',
      description:
        'Macchiato with a drizzle of caramel for an extra sweet touch.',
      price: '3.80',
    },
    {
      id: '19',
      name: 'Macchiato',
      subtitle: 'Vanilla Macchiato',
      image:
        'https://img.freepik.com/free-photo/vanilla-macchiato_1061358-30315.jpg',
      rating: '4.6',
      ratingCount: 'N/A',
      description:
        'Macchiato with a hint of vanilla for a sweet and aromatic flavor.',
      price: '3.70',
    },
    {
      id: '20',
      name: 'Macchiato',
      subtitle: 'Hazelnut Macchiato',
      image:
        'https://img.freepik.com/free-photo/hazelnut-macchiato_1061358-30316.jpg',
      rating: '4.5',
      ratingCount: 'N/A',
      description:
        'Macchiato with a touch of hazelnut syrup for a nutty twist.',
      price: '3.90',
    },
    {
      id: '21',
      name: 'Macchiato',
      subtitle: 'Coconut Macchiato',
      image:
        'https://img.freepik.com/free-photo/coconut-macchiato_1061358-30317.jpg',
      rating: '4.4',
      ratingCount: 'N/A',
      description: 'Macchiato with a hint of coconut for a tropical flavor.',
      price: '4.00',
    },
    {
      id: '22',
      name: 'Latte',
      subtitle: 'Classic Latte',
      image:
        'https://img.freepik.com/free-photo/classic-latte_1061358-30318.jpg',
      rating: '4.6',
      ratingCount: 'N/A',
      description: 'A creamy latte made with steamed milk and espresso.',
      price: '4.00',
    },
    {
      id: '23',
      name: 'Latte',
      subtitle: 'Vanilla Latte',
      image:
        'https://img.freepik.com/free-photo/vanilla-latte_1061358-30319.jpg',
      rating: '4.7',
      ratingCount: 'N/A',
      description:
        'Latte with a hint of vanilla syrup for a sweet and aromatic experience.',
      price: '4.20',
    },
    {
      id: '24',
      name: 'Latte',
      subtitle: 'Caramel Latte',
      image:
        'https://img.freepik.com/free-photo/caramel-latte_1061358-30320.jpg',
      rating: '4.5',
      ratingCount: 'N/A',
      description: 'Latte with caramel syrup for a rich and indulgent flavor.',
      price: '4.30',
    },
    {
      id: '25',
      name: 'Latte',
      subtitle: 'Hazelnut Latte',
      image:
        'https://img.freepik.com/free-photo/hazelnut-latte_1061358-30321.jpg',
      rating: '4.4',
      ratingCount: 'N/A',
      description: 'Latte with hazelnut flavor for a nutty and sweet touch.',
      price: '4.20',
    },
    {
      id: '26',
      name: 'Latte',
      subtitle: 'Coconut Latte',
      image:
        'https://img.freepik.com/free-photo/coconut-latte_1061358-30322.jpg',
      rating: '4.6',
      ratingCount: 'N/A',
      description: 'Latte with coconut syrup for a tropical twist.',
      price: '4.30',
    },
    {
      id: '27',
      name: 'Ristretto',
      subtitle: 'Classic Ristretto',
      image:
        'https://img.freepik.com/free-photo/classic-ristretto_1061358-30323.jpg',
      rating: '4.6',
      ratingCount: 'N/A',
      description:
        'A concentrated espresso with a strong flavor and rich crema.',
      price: '3.80',
    },
    {
      id: '28',
      name: 'Ristretto',
      subtitle: 'Vanilla Ristretto',
      image:
        'https://img.freepik.com/free-photo/vanilla-ristretto_1061358-30324.jpg',
      rating: '4.7',
      ratingCount: 'N/A',
      description:
        'Ristretto with a hint of vanilla for a sweet and aromatic experience.',
      price: '3.90',
    },
    {
      id: '29',
      name: 'Ristretto',
      subtitle: 'Caramel Ristretto',
      image:
        'https://img.freepik.com/free-photo/caramel-ristretto_1061358-30325.jpg',
      rating: '4.5',
      ratingCount: 'N/A',
      description: 'Ristretto with a drizzle of caramel for a rich flavor.',
      price: '4.00',
    },
    {
      id: '30',
      name: 'Ristretto',
      subtitle: 'Hazelnut Ristretto',
      image:
        'https://img.freepik.com/free-photo/hazelnut-ristretto_1061358-30326.jpg',
      rating: '4.4',
      ratingCount: 'N/A',
      description:
        'Ristretto with a touch of hazelnut flavor for a nutty twist.',
      price: '4.10',
    },
    {
      id: '31',
      name: 'Ristretto',
      subtitle: 'Coconut Ristretto',
      image:
        'https://img.freepik.com/free-photo/coconut-ristretto_1061358-30327.jpg',
      rating: '4.6',
      ratingCount: 'N/A',
      description: 'Ristretto with a hint of coconut for a tropical flavor.',
      price: '4.20',
    },
    {
      id: '32',
      name: 'Mocha',
      subtitle: 'Classic Mocha',
      image:
        'https://img.freepik.com/free-photo/classic-mocha_1061358-30328.jpg',
      rating: '4.7',
      ratingCount: 'N/A',
      description:
        'A delicious blend of espresso, steamed milk, and chocolate syrup.',
      price: '4.50',
    },
    {
      id: '33',
      name: 'Mocha',
      subtitle: 'Vanilla Mocha',
      image:
        'https://img.freepik.com/free-photo/vanilla-mocha_1061358-30329.jpg',
      rating: '4.8',
      ratingCount: 'N/A',
      description:
        'Mocha with a hint of vanilla syrup for a sweet and aromatic experience.',
      price: '4.60',
    },
    {
      id: '34',
      name: 'Mocha',
      subtitle: 'Caramel Mocha',
      image:
        'https://img.freepik.com/free-photo/caramel-mocha_1061358-30330.jpg',
      rating: '4.6',
      ratingCount: 'N/A',
      description: 'Mocha with caramel syrup for an indulgent and rich flavor.',
      price: '4.70',
    },
    {
      id: '35',
      name: 'Mocha',
      subtitle: 'Hazelnut Mocha',
      image:
        'https://img.freepik.com/free-photo/hazelnut-mocha_1061358-30331.jpg',
      rating: '4.5',
      ratingCount: 'N/A',
      description: 'Mocha with hazelnut flavor for a nutty twist.',
      price: '4.60',
    },
    {
      id: '36',
      name: 'Mocha',
      subtitle: 'Coconut Mocha',
      image:
        'https://img.freepik.com/free-photo/coconut-mocha_1061358-30332.jpg',
      rating: '4.7',
      ratingCount: 'N/A',
      description: 'Mocha with coconut syrup for a tropical flavor.',
      price: '4.70',
    },
    {
      id: '37',
      name: 'Espresso Beans',
      subtitle: 'Medium Roasted',
      image:
        'https://img.freepik.com/free-photo/coffee-beans-background_23-2148116656.jpg',
      rating: '4.5',
      ratingCount: 'N/A',
      description:
        'Medium roasted espresso beans with a rich and bold flavor for your perfect shot of espresso.',
      price: '4.20',
    },
    {
      id: '38',
      name: 'Cappuccino Beans',
      subtitle: 'Medium Roasted',
      image:
        'https://img.freepik.com/free-photo/coffee-beans-background_23-2148116656.jpg',
      rating: '4.5',
      ratingCount: 'N/A',
      description:
        'Medium roasted cappuccino beans with a rich and smooth flavor.',
      price: '4.20',
    },
    {
      id: '39',
      name: 'Americano Beans',
      subtitle: 'Medium Roasted',
      image:
        'https://img.freepik.com/free-photo/coffee-beans-background_23-2148116656.jpg',
      rating: '4.5',
      ratingCount: 'N/A',
      description:
        'Medium roasted americano beans with a bold and rich flavor.',
      price: '4.20',
    },
    {
      id: '40',
      name: 'Macchiato Beans',
      subtitle: 'Medium Roasted',
      image:
        'https://img.freepik.com/free-photo/coffee-beans-background_23-2148116656.jpg',
      rating: '4.5',
      ratingCount: 'N/A',
      description: 'Medium roasted macchiato beans with a rich and bold taste.',
      price: '4.20',
    },
    {
      id: '41',
      name: 'Latte Beans',
      subtitle: 'Medium Roasted',
      image:
        'https://img.freepik.com/free-photo/coffee-beans-background_23-2148116656.jpg',
      rating: '4.5',
      ratingCount: 'N/A',
      description: 'Medium roasted latte beans with a rich and creamy flavor.',
      price: '4.20',
    },
    {
      id: '42',
      name: 'Ristretto Beans',
      subtitle: 'Medium Roasted',
      image:
        'https://img.freepik.com/free-photo/coffee-beans-background_23-2148116656.jpg',
      rating: '4.5',
      ratingCount: 'N/A',
      description:
        'Medium roasted ristretto beans with a strong and intense flavor.',
      price: '4.20',
    },
    {
      id: '43',
      name: 'Mocha Beans',
      subtitle: 'Medium Roasted',
      image:
        'https://img.freepik.com/free-photo/coffee-beans-background_23-2148116656.jpg',
      rating: '4.5',
      ratingCount: 'N/A',
      description:
        'Medium roasted mocha beans with a rich and chocolatey flavor.',
      price: '4.20',
    },
  ];

  const filteredData = coffeeData.filter(
    (coffee) =>
      coffee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coffee.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCoffees = filteredData.filter((item) => {
    if (tabName === 'All') return true;
    if (tabName === 'Beans') return item.name.includes('Beans');
    return item.name.includes(tabName) && !item.name.includes('Beans');
  });

  const coffeeItems = filteredCoffees.filter(
    (item) => !item.name.includes('Beans')
  );
  const beanItems = coffeeData.filter((item) => item.name.includes('Beans'));

  const handleAddToCart = (item) => {
    const itemWithSize = { ...item, size: 'M' };
    addToCart(itemWithSize);
    addNotification({
      id: Date.now(),
      message: `${item.name} added to cart`,
    });
  };

  const renderCoffeeItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Details', { coffee: item })}>
      <View style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.cardImage} />
        {!item.name.includes('Beans') && (
          <View style={styles.ratingContainer}>
            <FontAwesome name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        )}
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
          <View style={styles.cardFooter}>
            <Text style={styles.cardPrice}>${item.price}</Text>
            <TouchableOpacity
              style={styles.addToCartButton}
              onPress={() => handleAddToCart(item)}>
              <Ionicons name="cart-outline" size={20} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}>
      {coffeeItems.length > 0 ? (
        <>
          <Text style={styles.sectionTitle}>Coffees</Text>
          <FlatList
            data={coffeeItems}
            renderItem={renderCoffeeItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </>
      ) : (
        <Text style={styles.noItemsText}>No items available</Text>
      )}
      {beanItems.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Coffee Beans</Text>
          <FlatList
            data={beanItems}
            renderItem={renderCoffeeItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 8,
    backgroundColor: '#121212',
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 16,
    paddingLeft: 8,
  },
  card: {
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    marginRight: 16,
    overflow: 'hidden',
    width: 200,
  },
  cardImage: {
    width: '100%',
    height: 150,
  },
  ratingContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'rgba(51, 51, 51, 0.8)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderBottomLeftRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: '#FFD700',
    marginLeft: 4,
  },
  cardContent: {
    padding: 8,
  },
  cardTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    color: '#cccccc',
    fontSize: 14,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  cardPrice: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addToCartButton: {
    backgroundColor: '#cf7844',
    borderRadius: 8,
    padding: 4,
  },
  noItemsText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default CoffeeList;
