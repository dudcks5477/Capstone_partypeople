import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Card from '../components/Card';

const WishlistScreen = () => {
  const [wishlist, setWishlist] = useState([]);
  const navigation = useNavigation();
  const [partyData,setPartyData]=useState([]);
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        
        const storedUserId = await AsyncStorage.getItem('userId');
        console.log(storedUserId)
        const response = await axios.get(`http://3.35.21.149:8080/wishlist/${storedUserId}`);
        
        setPartyData(response.data)
      } catch (e) {
        console.log("Wishlist fetch error", e);
      }
    };
    
    const unsubscribe = navigation.addListener('focus', fetchWishlist);
  
    return unsubscribe;
  }, [navigation]);

  

  return (
    <ScrollView style={{backgroundColor: "#222"}}>
      <View>
        <Text style={styles.title}>Wishlists</Text>
      </View>
      { partyData && partyData.map((party, index) => (
        <TouchableOpacity
          key={index}
          style={styles.cardContainer}
          onPress={() => navigation.navigate('PartyDetail', party.id)}
        >
          <Card partyData={party} style={{height : '10%'}}/>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    marginLeft: 15,
    marginTop: 30,
  },
  cardContainer: {alignItems: 'center', marginTop: 10},
  cardImage: {
    width: 362,
    height: 154,
    borderRadius: 8,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
  },
  cardText: {
    position: 'absolute',
    left: 16,
    bottom: 16,
    textAlign: 'left',
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default WishlistScreen;
