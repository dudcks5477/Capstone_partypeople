import React from 'react';
import {View, Image, Text, StyleSheet, SafeAreaView} from 'react-native';

const Card = ({image, title, description, price}) => (
  
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <Image source={image} style={styles.image} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.price}>{price}</Text>
      </View>
    </View>
  
);

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
