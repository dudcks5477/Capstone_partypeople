import React from 'react';
import HomeScreen from './src/screens/HomeScreen';
import DetailScreen from './src/screens/DetailScreen';
import LoginScreen from './src/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
export default function App() {
  return (
  <NavigationContainer>
    <Stack.Navigator initial RouteName="Home"> 
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} /> 
      <Stack.Screen name="Login" component={LoginScreen} /> 
    </Stack.Navigator>
  </NavigationContainer>
  );
  
}
