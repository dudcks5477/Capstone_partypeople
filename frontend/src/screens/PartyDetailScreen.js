import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, View, ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Line from '../container/Line';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PartyDetailScreen = () => {
  const [partyData, setPartyData] = useState({
    address: '',
    date: '',
    time: '',
    partyName: '',
    numOfPeople: '',
    description: '',
  });

  const handleButtonPress = () => {
    console.log("Hi");
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('partyData');
        setPartyData(storedData ? JSON.parse(storedData) : []);
      } catch(e){
        console.log(e)
      }
    }

    getData();
  }, []);

  return (
    <ScrollView>
      <Line style={{ marginTop: 20 }} />
      <TouchableOpacity onPress={handleButtonPress} style={{ flexDirection: 'row', alignItems: 'center' }}>
        <MaterialIcons name="chevron-left" size={24} color="black" style={{ marginRight: 8 }} />
        <Text>{partyData.partyName}</Text>
      </TouchableOpacity>
      <View style={styles.cardContainer}>
        <Image source={require('../assets/party1.jpeg')} style={styles.cardImage} />
      </View>
      <TouchableOpacity onPress={handleButtonPress} style={styles.hostProfile}>
        <MaterialIcons name="account-circle" size={24} color="black" />
        <Text>주최자</Text>
        <Text>Show profile</Text>
        <MaterialIcons name="chevron-right" size={24} color="black" style={{ marginRight: 8 }} />
      </TouchableOpacity>
      <Line />
      <View style={{ height: 136 }}>
        <Text>파티소개</Text>
        <Text>{partyData.description} {partyData.numOfPeople} {partyData.date} {partyData.time} {partyData.address}</Text>
      </View>
      <Line />
      <TouchableOpacity onPress={handleButtonPress} style={{ flexDirection: 'row', marginLeft: 5 }}>
        <View>
          <MaterialIcons name="account-circle" size={24} color="black" />
          <Text>참가자</Text>
        </View>
        <View>
          <MaterialIcons name="account-circle" size={24} color="black" />
          <Text>참가자</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  cardImage: {
    width: 362,
    height: 222,
    borderRadius: 8,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
});

export default PartyDetailScreen;
