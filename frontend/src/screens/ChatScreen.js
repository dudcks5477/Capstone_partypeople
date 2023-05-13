import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Line from '../container/Line';

const ChatScreen = ({ navigation }) => {
  const [chatRooms, setChatRooms] = useState([]);
  // add this state
  const [messageCount, setMessageCount] = useState(0);
  // add this state
  const [notificationCount, setNotificationCount] = useState(0);

  const [selectedTab, setSelectedTab] = useState('message');

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
      
      {/* 일단 뭔지 몰라서 주석처리 */}
      {/* <FlatList
        data={chatRooms}
        renderItem={renderItem}
        keyExtractor={item => item.partyName}
      /> */}
      <View style={{
        marginTop: 20, 
        width: '90%',
        marginHorizontal: '5%',
        }}>
         <View style={{flexDirection: 'row', marginBottom:13}}>
          <TouchableOpacity onPress={() => setSelectedTab('message')}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{marginRight: 35}}>Message</Text>
              {messageCount > 0 && (
                <View style={{
                  backgroundColor: 'black',
                  borderRadius: 50,
                  width: 20,
                  height: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 5,
                }}>
                  <Text style={{
                    color: 'white',
                    fontSize: 12,
                  }}>{messageCount}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedTab('notification')}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text>Notification</Text>
              {notificationCount > 0 && (
                <View style={{
                  backgroundColor: 'black',
                  borderRadius: 50,
                  width: 20,
                  height: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 5,
                }}>
                  <Text style={{
                    color: 'white',
                    fontSize: 12,
                  }}>{notificationCount}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>
        {selectedTab === 'message' && <Line style={{width: 70, backgroundColor: 'black'}}/>}
        {selectedTab === 'notification' && <Line style={{width: 100, marginLeft: '50%', backgroundColor: 'black'}}/>}
      </View>

      <Line style= {{marginBottom: 10}}/>

    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: 'gray',
    fontSize: 40,
    fontWeight: 'bold',
    marginLeft: 15,
    marginTop: 30,
  },
});

export default ChatScreen;
