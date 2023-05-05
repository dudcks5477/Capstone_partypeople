import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Card from './Card';

const listings = [
  {
    id: 1,
    image: require('../assets/newyork.jpeg'),
    title: 'Luxury Villa in Bali, New York',
    description:
      'Escape to your own private luxury villa in the heart of Bali. Relax by the pool, enjoy the view, and experience the ultimate in luxury.',
    price: '$450/night',
  },
  {
    id: 2,
    image: require('../assets/paris.jpeg'),
    title: 'Mountain Cottage in Paris',
    description:
      'Get away from it all in this cozy mountain cottage in the Swiss Alps. Perfect for hiking, skiing, and enjoying the great outdoors.',
    price: '$120/night',
  },
  {
    id: 3,
    image: require('../assets/seoul.jpeg'),
    title: 'Beachfront Bungalow in Seoul',
    description:
      'Relax on the beach in your own private bungalow in Thailand. Perfect for soaking up the sun, swimming in the sea, and enjoying the local cuisine.',
    price: '$200/night',
  },
];

const PartyCard = () => {
  return (
    <View style={styles.container}>
      <ScrollView vertical>
        {listings.map((listing) => (
          <Card
            key={listing.id}
            image={listing.image}
            title={listing.title}
            description={listing.description}
            price={listing.price}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
});

export default PartyCard;
