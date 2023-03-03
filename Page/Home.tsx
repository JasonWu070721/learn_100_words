import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Words from './Words';
import Practice from './Practice';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          let iconName = '';
          if (route.name === 'Words') {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline';
          } else if (route.name === 'Practice') {
            iconName = focused ? 'ios-list-circle' : 'ios-list';
          }
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen name="Words" component={Words} />
      <Tab.Screen name="Practice" component={Practice} />
    </Tab.Navigator>
  );
};

export default Home;
