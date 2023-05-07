import React from 'react';
import SearchBar from '../container/SearchBar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Line from '../container/Line';
import PartyCard from '../components/PartyCard'
// const Stack = createNativeStackNavigator();
const HomeScreen = ({ address, partyName, numOfPeople, description, date, time }) => (
  <>
    <SearchBar />
    <Line style={{ marginTop: 20 }} />
    <PartyCard
    address={address}
    partyName={partyName}
    numOfPeople={numOfPeople}
    description={description}
    date={date}
    time= {time} />
  </>
);


export default HomeScreen;