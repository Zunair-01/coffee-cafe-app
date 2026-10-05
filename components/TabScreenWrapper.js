import React from 'react';
import CoffeeList from './CoffeeList';

const TabScreenWrapper = ({ route, navigation }) => {
  const tabName = route.name;
  return <CoffeeList tabName={tabName} navigation={navigation} />;
};

export default TabScreenWrapper;
