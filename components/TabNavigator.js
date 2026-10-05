import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TabScreenWrapper from './TabScreenWrapper';

const Tab = createMaterialTopTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#999999',
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: { backgroundColor: '#1e1e1e' },
        tabBarIndicatorStyle: { backgroundColor: '#cf7844' },
        tabBarScrollEnabled: true,
      }}>
      <Tab.Screen name="All" component={TabScreenWrapper} />
      <Tab.Screen name="Cappuccino" component={TabScreenWrapper} />
      <Tab.Screen name="Espresso" component={TabScreenWrapper} />
      <Tab.Screen name="Americano" component={TabScreenWrapper} />
      <Tab.Screen name="Macchiato" component={TabScreenWrapper} />
      <Tab.Screen name="Latte" component={TabScreenWrapper} />
      <Tab.Screen name="Ristretto" component={TabScreenWrapper} />
      <Tab.Screen name="Mocha" component={TabScreenWrapper} />
    </Tab.Navigator>
  );
}

export default TabNavigator;
