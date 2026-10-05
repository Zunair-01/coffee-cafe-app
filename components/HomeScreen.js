import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CoffeeList from './CoffeeList';
import Header from './Header';

const Tab = createMaterialTopTabNavigator();

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header
        navigation={navigation}
        menuIcon="menu"
        profileIcon="account-circle"
      />
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#cf7844',
          tabBarInactiveTintColor: '#999999',
          tabBarLabelStyle: { fontSize: 12 },
          tabBarStyle: { backgroundColor: '#121212' },
          tabBarIndicatorStyle: { backgroundColor: '#cf7844' },
          tabBarScrollEnabled: true,
        }}>
        <Tab.Screen name="All">
          {() => <CoffeeList tabName="All" navigation={navigation} />}
        </Tab.Screen>
        <Tab.Screen name="Cappuccino">
          {() => <CoffeeList tabName="Cappuccino" navigation={navigation} />}
        </Tab.Screen>
        <Tab.Screen name="Espresso">
          {() => <CoffeeList tabName="Espresso" navigation={navigation} />}
        </Tab.Screen>
        <Tab.Screen name="Americano">
          {() => <CoffeeList tabName="Americano" navigation={navigation} />}
        </Tab.Screen>
        <Tab.Screen name="Macchiato">
          {() => <CoffeeList tabName="Macchiato" navigation={navigation} />}
        </Tab.Screen>
        <Tab.Screen name="Latte">
          {() => <CoffeeList tabName="Latte" navigation={navigation} />}
        </Tab.Screen>
        <Tab.Screen name="Ristretto">
          {() => <CoffeeList tabName="Ristretto" navigation={navigation} />}
        </Tab.Screen>
        <Tab.Screen name="Mocha">
          {() => <CoffeeList tabName="Mocha" navigation={navigation} />}
        </Tab.Screen>
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
});

export default HomeScreen;
