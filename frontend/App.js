import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import LoginScreen from './src/screens/LoginScreen';
import UnderBarButton from './src/container/UnderBarButton';
import HomeScreen from './src/screens/HomeScreen';
import Listings from './src/components/Listings'
import MapScreen from './src/screens/MapScreen';
import AddScreen from './src/screens/AddScreen'
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="HomeSearchBar" component={HomeScreen} />
        <Stack.Screen name="BottomTab" component={UnderBarButton} options={{ headerShown: false }} />
        <Stack.Screen name="Listings" component={Listings} />
        <Stack.Screen name="MapScreen" component={MapScreen} />
        <Stack.Screen name="AddScreen" component={AddScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
