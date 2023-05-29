import React, { useState } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import Config from 'react-native-config';
import { ScrollView } from 'react-native-gesture-handler';

const Card = ({partyData}) => {
  // const [partyData, setPartyData] = useState({
  //   address: '',
  //   date: '',
  //   time: '',
  //   partyName: '',
  //   numOfPeople: '',
  //   description: '',
  // });
  console.log(partyData)
  return (
    <>
      <View style={styles.cardContainer}>
        {/* 여기다가 TouchableOpacity만들어서 보내보자 내생각엔 */}
        <View style={styles.card}>
          {/* <Image source={partyData.imageNames} style={styles.image} /> */}
          <Text style={styles.title}>{partyData.partyName}</Text>
          <Text style={styles.description}>{partyData.description}</Text>
          <Text style={styles.title}>{partyData.numOfPeople}</Text>
          <Text style={styles.title}>{partyData.date}</Text>
<Text style={styles.title}>{partyData.time}</Text>
<Text style={styles.title}>{partyData.address}</Text>
</View>
</View>
</>
);
};

const styles = StyleSheet.create({
cardContainer: {
alignItems: 'center',
justifyContent: 'center',
},
card: {
backgroundColor: '#fff',
borderRadius: 16,
overflow: 'hidden',
elevation: 5,
margin: 10,
width: '90%',
aspectRatio: 1.5,
},
image: {
width: '100%',
height: '60%',
},
title: {
fontWeight: 'bold',
fontSize: 16,
marginHorizontal: 10,
marginTop: 10,
},
description: {
fontSize: 14,
marginHorizontal: 10,
marginVertical: 5,
},
price: {
fontSize: 16,
marginHorizontal: 10,
marginBottom: 10,
fontWeight: 'bold',
},
});

export default Card;