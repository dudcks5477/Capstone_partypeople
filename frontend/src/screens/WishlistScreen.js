import React, { useState, useEffect } from 'react';
import { View, Text ,StyleSheet,ScrollView,TouchableOpacity,Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
const WishlistScreen = ({ route }) => {
  const {isFavorite,address,date ,time,partyName,numOfPeople,description} = route.params || {};
  const [wishlist, setWishlist] = useState([]);
  const navigation = useNavigation();
  console.log("",isFavorite)
  const images = [
    require('../assets/party1.jpeg'),
    require('../assets/party2.jpeg'),
    require('../assets/party3.jpeg'),
    // 이미지 경로 추가
  ]
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await AsyncStorage.getItem('wishlist');
        if (data !== null) {
          setWishlist(JSON.parse(data));
        }
      } catch (e) {
        console.log("Wish", e);
      }
    };
  
    const unsubscribe = navigation.addListener('focus', () => {
      getData();
    });
  
    return unsubscribe;
  }, [navigation]);
const handleCardPress = () => {
    navigation.navigate('PartyDetail');
  };
  

  return (
    <ScrollView style={{backgroundColor: "#222"}}>
      <View>
        <Text style={styles.title}>Wishlists</Text>
      </View>
      {wishlist.map((party, index) => (
        <TouchableOpacity
          key={index}
          style={styles.cardContainer}
          onPress={handleCardPress}
        >
          <Image source={require('../assets/party1.jpeg')} style={styles.cardImage} />
          <Text style={styles.cardText}>{party.partyName}</Text>
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
