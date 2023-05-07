import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import LoginScreen from './src/screens/LoginScreen';
import UnderBarButton from './src/container/UnderBarButton';
import HomeScreen from './src/screens/HomeScreen';
import PartyCard from './src/components/PartyCard'
import MapScreen from './src/screens/MapScreen';
import AddScreen from './src/screens/AddScreen'
import MapScreen2 from './src/screens/MapScreen2';
import AddScreen from './src/screens/AddScreen';
import PartyDetailScreen from './src/screens/PartyDetailScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="HomeSearchBar" component={HomeScreen} />
        <Stack.Screen name="BottomTab" component={UnderBarButton} options={{ headerShown: false }} />
        <Stack.Screen name="PartyCard" component={PartyCard} />
        <Stack.Screen name="MapScreen" component={MapScreen} />
        <Stack.Screen name="AddScreen" component={AddScreen} />
        <Stack.Screen name="Map2" component={MapScreen2} />
        <Stack.Screen name='PartyDetail' component={PartyDetailScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;