import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';
import PrivateProfileScreen from '../screens/PrivateProfileScreen';
import MapScreen from '../screens/MapScreen';
import WishlistScreen from '../screens/WishlistScreen';
const Tab = createBottomTabNavigator();

const UnderBarButton = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Wishlist" component={WishlistScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="PrivateProfile" component={PrivateProfileScreen} />
    </Tab.Navigator>
  );
};

export default UnderBarButton;
