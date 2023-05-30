import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';

const Card = ({partyData}) => {
  const {imageDetails = [], partyName, content, partyDateTime, partyLocation, time, address} = partyData;
  
  const imageUrl = imageDetails.length > 0 ? imageDetails[0].uri : null;
  console.log(imageUrl)
  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        {imageUrl && 
          <Image 
            source={{uri: imageUrl}}
            style={styles.image} 
          />
        }
        <Text style={styles.title}>{partyName}</Text>
        <Text style={styles.description}>{content}</Text>
        <Text style={styles.title}>{partyDateTime}</Text>
        <Text style={styles.title}>{partyLocation}</Text>
        <Text style={styles.title}>{time}</Text>
        <Text style={styles.title}>{address}</Text>
      </View>
    </View>
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
});

export default Card;
