import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, View, ScrollView, Button, Alert } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Line from '../container/Line';
import { TouchableHighlight } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
const PartyDetailScreen = ({ route }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [partyData, setPartyData] = useState({
    address: '',
    date: '',
    time: '',
    partyName: '',
    numOfPeople: '',
    description: '',
    images: [],
  });
 
  const navigation = useNavigation();
  const partyId  = route.params;
  console.log("ID",partyId)

  useEffect(() => {
    fetchPartyDetail();
    checkIsFavorite();
  }, []);
  
  const fetchPartyDetail = async () => {
    try {
      const response = await axios.get(`http://3.35.21.149:8080/party/${partyId}`);

      setPartyData(response.data);
    } catch (e) {
      console.error("ss",e);
    }
  };
  const checkIsFavorite = async () => {
    try {
      const storedUserId = JSON.parse(await AsyncStorage.getItem('userId'));
      const response = await axios.get(`http://3.35.21.149:8080/wishlist/${storedUserId}`);
      const wishlist = response.data;

      setIsFavorite(wishlist.includes(partyId));
    } catch (e) {
      console.error(e);
    }
  };
  const toggleFavorite = async () => {
    try {
      const storedUserId = JSON.parse(await AsyncStorage.getItem('userId'));
      let response;
  
      if (isFavorite) {
        response = await axios.post(`http://3.35.21.149:8080/wishlist/${storedUserId}/remove/${partyId}`);
      } else {
        response = await axios.post(`http://3.35.21.149:8080/wishlist/${storedUserId}/add/${partyId}`);
      }
    
      setIsFavorite(!isFavorite);
      console.log(response.data);
      console.log("sto",storedUserId);
      console.log("tID",partyId);
    } catch (e) {
      console.error("toggle",e);
    }
  };
  const joinChatRoom = async () => {
    try {
      const storedUserId = JSON.parse(await AsyncStorage.getItem('userId'));
      console.log(partyId)
      console.log(storedUserId)
      const response = await axios.post(`http://3.35.21.149:8080/party/${partyId}/join/${storedUserId}`);
      
      if (response.status === 200) {
        console.log(response.data)
        const chatRoomId = response.data.chatRoomId;
        navigation.navigate('Chat', { chatRoomId: chatRoomId });
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
    <ScrollView style={{backgroundColor: '#222'}}>
      <TouchableOpacity onPress={handleGoBack} style={{
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        marginHorizontal: '5%',
        marginTop: 20}}>
        <MaterialIcons name="chevron-left" size={24} color="white" style={{ marginRight: 2}} />
        <Text style={styles.colW}>{partyData.partyName}</Text>
      </TouchableOpacity>

      <View style={styles.cardContainer}>
        {partyData.images && partyData.images.length > 0 ? (
          partyData.images.map((image, index) => (
            <Image key={index} source={{ uri: image }} style={styles.cardImage} />
          ))
        ) : (
          <Image source={require('../assets/party1.jpeg')} style={styles.cardImage} />
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
        <MaterialIcons name="chevron-right" size={24} color="white" style={{marginRight:8}}/>
      </TouchableOpacity>


      <Line/>

      <View style={{width:"90%", marginHorizontal:"5%", height:177}}>
        <Text style={styles.colW}>파티소개</Text>
        <Text style={styles.colW}>{partyData.description} {partyData.numOfPeople} {partyData.date} {partyData.time} {partyData.address}명 만 모집하는 저희 Party UP 직원을 구인합니다.</Text>
      </View>

      <Line/>  

      {/* onPress 동작이 안함 */}
      <View style={styles.attendeesContainer}>
        <ScrollView horizontal>
          {[...Array(10)].map((_, index) => (
            <TouchableHighlight
              key={index}
              underlayColor="#DDD"
              onPress={() => handleAttendeePress(index)}
              style={styles.attendeeButton}
            >
              <View style={styles.attendee}>
                <MaterialIcons name="account-circle" size={50} color="white"/>
                <Text style={styles.colW}>참가자</Text>
              </View>
            </TouchableHighlight>
          ))}
        </ScrollView>
      </View>
      <View style={styles.buttonContainer}>
        <View style={[styles.cartContainer, { opacity: 0.7 }]}>
          <MaterialIcons name="monetization-on" size={28} color="white"/>
          <Text style={styles.cartText}>100</Text>
        </View>
        <Button title="참석하기" color="black" onPress={joinChatRoom} style={{borderRadius: 30}}/>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  colW: {
    color: 'white'
  },
  header: {
    marginTop: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginHorizontal: '5%',
    marginTop: 2,
  },
  partyTitle: {
    marginLeft: 2,
  },
  cardContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  cardImage: {
    width: '90%',
    height: 222,
    borderRadius: 8,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  hostProfile: {
    width: '90%',
    marginHorizontal: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10,
  },
  profileTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    marginLeft: '5%',
    marginBottom: 5,
  },
  line: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginHorizontal: '5%',
  },
  attendeesContainer: {
    flexDirection: 'row',
    width: '90%',
    marginHorizontal: '5%',
    marginTop: 5,
  },
  attendeeButton: {
    marginRight: 10,
  },
  attendee: {
    alignItems: 'center',
  },
  buttonContainer: {
    margin: 45,
    width: '90%',
    marginHorizontal: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 30
  },
  cartText: {
    marginLeft: 5,
    color: 'white',
    fontWeight: 'bold'
  },
});


export default PartyDetailScreen;