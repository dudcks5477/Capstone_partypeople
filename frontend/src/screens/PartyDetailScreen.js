import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, View, ScrollView, Button, Alert } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Line from '../container/Line';
import { TouchableHighlight } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {styles} from './Styles/PartyDetailStyles'
const PartyDetailScreen = ({ route }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [partyData, setPartyData] = useState();
  
  const navigation = useNavigation();
  const partyId  = route.params;
  console.log("ID",partyId)

  useEffect(() => {
    fetchPartyDetail();
    checkIsFavorite();
  }, [partyId]);
  
  const fetchPartyDetail = async () => {
    try {
      const response = await axios.get(`http://3.35.21.149:8080/party/${partyId}`);
      
      setPartyData(response.data);
      console.log("datat",partyData)
    } catch (e) {
      console.error("ss",e);
    }
  };
  const checkIsFavorite = async () => {
    try {
      
      const storedUserId = JSON.parse(await AsyncStorage.getItem('userId'));
      console.log("sID",storedUserId)
      const response = await axios.get(`http://3.35.21.149:8080/wishlist/${storedUserId}`);
      console.log(response.data)
      const wishlist = response.data;
      const wishlistIds = wishlist.map(item => item.id);
      setIsFavorite(wishlistIds.includes(partyId));
    } catch (e) {
      console.error(e);
    }
  };
  const toggleFavorite = async () => {
    try {
      const storedUserId = JSON.parse(await AsyncStorage.getItem('userId'));
      let response;
  
      if (isFavorite) {
        response = await axios.delete(`http://3.35.21.149:8080/wishlist/${storedUserId}/remove/${partyId}`);
      } else {
        response = await axios.post(`http://3.35.21.149:8080/wishlist/${storedUserId}/add/${partyId}`);
      }
    
      if (response.status === 200) {
        setIsFavorite(!isFavorite);
      } else {
        console.error('Failed to toggle favorite');
      }
      
    } catch (e) {
      console.error(e);
    }
  };
  const joinChatRoom = async () => {
    try {
      const storedUserId = JSON.parse(await AsyncStorage.getItem('userId'));
      console.log("pid",partyId)
      console.log("stoid",storedUserId)
      const response = await axios.post(`http://3.35.21.149:8080/party/${partyId}/join/${storedUserId}`);
      console.log(response)
      if (response.status === 200) {
        // console.log(response.data)
        // const chatRoomId = response.data.chatRoomId;
        // , { chatRoomId: chatRoomId }
        navigation.navigate('Chat');
      } else {
        console.error('Failed to join chat room');
      }
    } catch (e) {
      console.error("dd",e);
    }
  };
  const handleAttendeePress = (attendeeIndex) => {
    // attendeeIndex를 사용해 원하는 동작 수행
    console.log(`Attendee ${attendeeIndex} was pressed`);
  };

  const handleGoBack = () => {
    navigation.goBack(); // 이전으로 돌아가기
  }


  return (
    <ScrollView style={styles.container}>
    {partyData ? (
      <>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <MaterialIcons name="chevron-left" size={24} color="white" style={{ marginRight: 2 }} />
          <Text style={styles.colW}>{partyData.partyName}</Text>
        </TouchableOpacity>

        <View style={styles.cardContainer}>
        {partyData.imageUrls && partyData.imageUrls.length > 0 ? (
          partyData.imageUrls.map((imageUrl, index) => (
            <Image key={index} source={{ uri: imageUrl }} style={styles.cardImage} />
          ))
        ) : (
          <Image 
            // Image Placeholder
          />
        )}
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen', { userId: partyData.hostId })} style={styles.hostProfile}>
          <View style={styles.profileTextContainer}>
            <MaterialIcons name="account-circle" size={50} color="white" />
            <View>
              <Text style={styles.colW}>{partyData.hostName}</Text>
              <Text style={styles.colW}>Show profile</Text>
            </View>
          </View>
          <MaterialIcons name="chevron-right" size={24} color="white" style={{ marginRight: 8 }} />
        </TouchableOpacity>

        <Line />

        <View style={styles.partyInfoContainer}>
          <Text style={styles.colW}>파티소개</Text>
          <Text style={styles.colW}>
            {partyData.content} {partyData.numOfPeople} {partyData.partyDateTime} {partyData.partyLocation}
          </Text>
        </View>

        <Line />

        <View style={styles.attendeesContainer}>
          <ScrollView horizontal>
            {partyData.participantIds.map((attendeeId, index) => (
              <TouchableHighlight
                key={index}
                underlayColor="#DDD"
                onPress={() => handleAttendeePress(index)}
                style={styles.attendeeButton}
              >
                <View style={styles.attendee}>
                  <MaterialIcons name="account-circle" size={50} color="white" />
                  <Text style={styles.colW}>참가자 {attendeeId}</Text>
                </View>
              </TouchableHighlight>
            ))}
          </ScrollView>
        </View>
        <View style={styles.buttonContainer}>
  <View style={[styles.cartContainer, { opacity: 0.7 }]}>
    <MaterialIcons name="monetization-on" size={28} color="white" />
    <Text style={styles.cartText}>100</Text>
  </View>
  <Button title="참석하기" color="black" onPress={joinChatRoom} style={{ borderRadius: 30 }} />
  <TouchableOpacity onPress={toggleFavorite}>
    <View>
      {isFavorite ? (
        <MaterialIcons name="favorite" size={28} color="red" />
      ) : (
        <MaterialIcons name="favorite-border" size={28} color="black" />
      )}
    </View>
  </TouchableOpacity>
</View>
      </>
    ) : (
      <Text>Loading...</Text>
    )}
    </ScrollView>
  );
};

export default PartyDetailScreen;