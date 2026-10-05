import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabs from './components/BottomTabs';
import CoffeeDetailsScreen from './components/CoffeeDetailsScreen';
import AddToCartScreen from './components/tabs/AddToCartScreen';
import AddressScreen from './components/tabs/AddressScreen';
import OrderSuccess from './components/tabs/OrderSuccess';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import ProfileScreen from './components/ProfileScreen.js';
import { SearchProvider } from './context/SearchContext';
import { NotificationProvider } from './context/NotificationContext';
import Login from './components/userInformation/Login';
import Register from './components/userInformation/Register';
import { AuthProvider } from './context/AuthContext';

const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <WishlistProvider>
          <CartProvider>
            <SearchProvider>
              <NavigationContainer>
                <Stack.Navigator
                  initialRouteName="Login"
                  screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="Home" component={BottomTabs} />
                  <Stack.Screen
                    name="Details"
                    component={CoffeeDetailsScreen}
                  />
                  <Stack.Screen
                    name="AddToCartScreen"
                    component={AddToCartScreen}
                  />
                  <Stack.Screen
                    name="AddressScreen"
                    component={AddressScreen}
                  />
                  <Stack.Screen name="OrderSuccess" component={OrderSuccess} />
                  <Stack.Screen
                    name="ProfileScreen"
                    component={ProfileScreen}
                  />
                  <Stack.Screen name="Login" component={Login} />
                  <Stack.Screen name="Register" component={Register} />
                </Stack.Navigator>
              </NavigationContainer>
            </SearchProvider>
          </CartProvider>
        </WishlistProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}
