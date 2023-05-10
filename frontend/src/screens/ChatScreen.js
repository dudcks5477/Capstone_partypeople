import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Line from '../container/Line';

const ChatScreen = ({ navigation }) => {
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });

    return unsubscribe;
  }, [navigation]);

  const fetchData = async () => {
    try {
      const chatRoomData = await AsyncStorage.getItem('chatRooms');
      if (chatRoomData !== null) {
        setChatRooms(JSON.parse(chatRoomData));
      }
    } catch (e) {
      console.log("Error fetching data", e);
    }
  };

  function renderItem({ item }) {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ChatRoomScreen', { partyName: item.partyName })}
      >
        <Text>{item.partyName}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View>
      <Text style={styles.title}>채팅</Text>
      <FlatList
        data={chatRooms}
        renderItem={renderItem}
        keyExtractor={item => item.partyName}
      />
      <Line />
    </View>
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
});

export default ChatScreen;
