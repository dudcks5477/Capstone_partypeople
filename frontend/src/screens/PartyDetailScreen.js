import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Image, View, ScrollView} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Line from '../container/Line';
// import { useEffect, useState } from 'react';

const PartyDetailScreen = ({navigation,route}) => {
  const { address, partyName, numOfPeople, description, date, time } = route.params || {};
  const handleButtonPress = () => {
    // 버튼을 눌렀을 때 동작
    console.log(route);
  };
  
  return (
    <ScrollView>
      <Line style={{marginTop: 20}} />
      <TouchableOpacity onPress={handleButtonPress} style={{flexDirection: 'row', alignItems: 'center'}}>
        <MaterialIcons name="chevron-left" size={24} color="black" style={{ marginRight: 8}} />
        <Text>{partyName}</Text>
      </TouchableOpacity>
      <View style={styles.cardContainer}>
        <Image source={require('../assets/party1.jpeg')} style={styles.cardImage} />
      </View>
      <TouchableOpacity onPress={handleButtonPress} style={styles.hostProfile}>
        <MaterialIcons name="account-circle" size={24} color="black" />
        <Text>주최자</Text>
        <Text>Show profile</Text>
        <MaterialIcons name="chevron-right" size={24} color="black" style={{marginRight:8}}/>
      </TouchableOpacity>
      <Line/>
      <View style={{height:136}}>
        <Text>파티소개</Text>
        <Text>{description} {numOfPeople} {date} {time} {address}</Text>
      </View>
      <Line/>      
      <TouchableOpacity onPress={handleButtonPress} style={{flexDirection: 'row', marginLeft: 5}}> 
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
})

export default PartyDetailScreen;
