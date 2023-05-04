import React from 'react';
import SearchBar from '../container/SearchBar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Line from '../container/Line';

const Stack = createNativeStackNavigator();
const HomeScreen = () => (
  <>
    <SearchBar/>
    <Line style={{marginTop: 20}} />
  </>
);

export default HomeScreen;
