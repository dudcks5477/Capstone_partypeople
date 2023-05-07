import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';
import PrivateProfileScreen from '../screens/PrivateProfileScreen';
import MapScreen from '../screens/MapScreen';
import WishlistScreen from '../screens/WishlistScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

const UnderBarButton = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Map') {
            iconName = 'map';
          } else if (route.name === 'Wishlist') {
            iconName = 'favorite';
          } else if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Chat') {
            iconName = 'chat';
          } else if (route.name === 'PrivateProfile') {
            iconName = 'person';
          }

          return (
            <MaterialIcons
              name={iconName}
              color={focused ? '#B39DDB' : 'black'}
              size={size}
            />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: '#B39DDB',
        inactiveTintColor: 'black',
      }}
    >
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Wishlist" component={WishlistScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="PrivateProfile" component={PrivateProfileScreen} />
    </Tab.Navigator>
  );
};

export default UnderBarButton;