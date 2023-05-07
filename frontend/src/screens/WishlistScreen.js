import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const WishlistScreen = () => {
  const navigation = useNavigation();

  const handleCardPress = () => {
    navigation.navigate('PartyDetail');
  };

  return (
    <ScrollView>
      <View>
        <Text style={styles.title}>Wishlists</Text>
      </View>
      <TouchableOpacity style={styles.cardContainer} onPress={handleCardPress}>
        <Image source={require('../assets/party1.jpeg')} style={styles.cardImage} />
        <Text style={styles.cardText}>찬's 파티 3월 18일 6시</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cardContainer} onPress={handleCardPress}>
        <Image source={require('../assets/party2.jpeg')} style={styles.cardImage} />
        <Text style={styles.cardText}>찬's 파티 3월 18일 6시</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cardContainer} onPress={handleCardPress}>
        <Image source={require('../assets/party3.jpeg')} style={styles.cardImage} />
        <Text style={styles.cardText}>찬's 파티 3월 18일 6시</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cardContainer} onPress={handleCardPress}>
        <Image source={require('../assets/party4.jpeg')} style={styles.cardImage} />
        <Text style={styles.cardText}>찬's 파티 3월 18일 6시</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    color: '#000',
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
