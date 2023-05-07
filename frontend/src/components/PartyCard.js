import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Card from './Card';
import {useNavigation} from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
// address,partyName,numOfPeople,description,latitude,longitude,date,time
const PartyCard = ({ address, partyName, numOfPeople, description, date, time }) => {
  
  const navigation = useNavigation();
  console.log("Party",address, partyName, numOfPeople, description, date, time)
  // console.log(listing.i)
  const listings = [
    {
      id:1,
      partyName: partyName,
      address : address,
      image: require('../assets/newyork.jpeg'),
      numOfPeople : numOfPeople,
      description: description,
      date : date,
      time : time
    },

  ];

  return (
    <SafeAreaView style={styles.containerNotch}>
      <View style={styles.container}>
        <ScrollView>
          {listings.map(listing => (
            <TouchableOpacity
              key={listing.id}
              style={styles.cardButton}
              onPress={() => navigation.navigate('PartyDetail')}
              activeOpacity={1}>
              <Card {...listing} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerNotch: {
    flex: 1,
  },
  container: {
    marginVertical: 10,
  },
  cardButton: {
    marginBottom: 10,
  },
});

export default PartyCard;
