import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import { styles } from '../screens/Styles/CardStyles'
const Card = ({partyData}) => {
  const {imageDetails = [], partyName, content, partyDateTime, partyLocation, time, address} = partyData;
  
  const imageUrl = imageDetails.length > 0 ? imageDetails[0].uri : null;
  console.log("dd",imageUrl)
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



export default Card;
