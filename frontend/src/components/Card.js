import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';

const Card = ({ image, title, description, price }) => {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.price}>{price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5,
    margin: 10,
    width: '48%',
    aspectRatio: 1,
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