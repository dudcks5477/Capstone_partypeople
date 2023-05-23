import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';
import PrivateProfileScreen from '../screens/PrivateProfileScreen';
import MapScreen from '../screens/MapScreen';
import WishlistScreen from '../screens/WishlistScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

const UnderBarButton = () => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      tabBarIcon: ({focused, color, size}) => {
        const icons = {
          Map: 'map',
          Wishlist: 'favorite',
          Home: 'home',
          Chat: 'chat',
          PrivateProfile: 'person',
        };
        const iconName = icons[route.name];
        return (
          <MaterialIcons
            name={iconName}
            color={focused ? '#B39DDB' : 'white'}
            size={size}
          />
        );
      },
      tabBarActiveTintColor: '#B39DDB',
      tabBarInactiveTintColor: 'white',
      tabBarStyle: { backgroundColor: 'black' }
    })}>
    <Tab.Screen name="Map" component={MapScreen} options={{
          headerShown: false,
        }}/>
    <Tab.Screen name="Wishlist" component={WishlistScreen} options={{
          headerShown: false,
        }}/>
    <Tab.Screen name="Home" component={HomeScreen} options={{
          headerShown: false,
        }}/>
    <Tab.Screen name="Chat" component={ChatScreen} options={{
          headerShown: false,
        }}/>
    <Tab.Screen name="PrivateProfile" component={PrivateProfileScreen} options={{
          headerShown: false,
        }}/>
  </Tab.Navigator>
);

export default UnderBarButton;
