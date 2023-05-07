import React from 'react';
import {View, Image, Text, StyleSheet, SafeAreaView} from 'react-native';
import Config from 'react-native-config';

const Card = ({image, address, partyName, numOfPeople, description, date, time}) => {
  console.log("CARd",image, address, partyName, numOfPeople, description, date, time);
  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <Image source={image} style={styles.image} />
        <Text style={styles.title}>{partyName}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.title}>{numOfPeople}</Text>
        <Text style={styles.title}>{date}</Text>
        <Text style={styles.title}>{time}</Text>
        <Text style={styles.title}>{address}</Text>
      </View>
    </View>
  );
};
//홈으로가서 party card한테 변수 넘겨서 바꿔야될듯
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
