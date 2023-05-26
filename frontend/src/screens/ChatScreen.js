import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Line from '../container/Line';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ChatScreen = ({ navigation }) => {
  const [chatRooms, setChatRooms] = useState([]);
  const [selectedTab, setSelectedTab] = useState('message');
  const [messageCount, setMessageCount] = useState(0);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // 채팅방 목록을 백엔드 서버에서 가져온다고 가정합니다.
      // 백엔드 API 호출 등 필요한 로직을 수행하여 chatRooms 데이터를 설정합니다.
      const chatRoomsData = await fetchChatRooms(); // 채팅방 목록을 가져오는 API 호출

      // 가져온 채팅방 목록을 상태에 설정합니다.
      setChatRooms(chatRoomsData);
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };

  const fetchChatRooms = async () => {
    try {
      const response = await fetch('http://ec2-13-209-74-82.ap-northeast-2.compute.amazonaws.com:8080/api/chatRooms', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // 필요한 경우 추가적인 헤더 설정
        },
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error('Failed to fetch chat rooms');
        return [];
      }
    } catch (error) {
      console.error('Error fetching chat rooms:', error);
      return [];
    }
  };
  

  function renderItem({ item }) {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ChatRoomScreen', {
            chatRoomId: item.chatRoomId,
            partyName: item.partyName,
            isHost: item.hostId === 'myHostId',
          })
        }
      >
        <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
          <MaterialIcons name="account-circle" size={60} color="gray" style={{ marginRight: 2 }} />
          <View style={{ flexDirection: 'column' }}>
            <Text style={{ fontSize: 14 }}>{item.partyName}</Text>
            <Text style={{ fontSize: 12 }}>{item.hostId === 'myHostId' ? '주최자' : '참석자'}</Text>
            <Text style={{ fontSize: 10 }}>{`${item.attendeesCount}명 참석자`}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: '#222'}}>
      <Text style={styles.title}>채팅</Text>

      <View style={{ marginTop: 20, width: '90%', marginHorizontal: '5%' }}>
        <View style={{ flexDirection: 'row', marginBottom: 13 }}>
          <TouchableOpacity onPress={() => setSelectedTab('message')}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={[styles.text, {marginRight: 35}]}>Message</Text>
              {messageCount > 0 && (
                <View style={styles.notificationBadge}>
                  <Text style={styles.badgeText}>{messageCount}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedTab('notification')}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.text}>Notification</Text>
              {notificationCount > 0 && (
                <View style={styles.notificationBadge}>
                  <Text style={styles.badgeText}>{notificationCount}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>
        {selectedTab === 'message' && <Line style={{ width: 60, marginLeft: '0%', backgroundColor: 'black' }} />}
        {selectedTab === 'notification' && (
          <Line style={{ width: 75, marginLeft: '26%', backgroundColor: 'black' }} />
        )}
      </View>

      <Line style={{ marginBottom: 10 }} />

      <View style={{ flex: 1 }}>
        <FlatList
          style={{ width: '90%', marginHorizontal: '5%' }}
          data={chatRooms}
          keyExtractor={(item) => item.chatRoomId}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
    marginLeft: 15,
    marginTop: 30,
  },
  notificationBadge: {
    backgroundColor: 'black',
    borderRadius: 50,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
  },
  text: {
    color: '#fff',
    fontSize: 14
  },
  subText: {
    color: '#fff',
    fontSize: 12
  },
  smallText: {
    color: '#fff',
    fontSize: 10
  }
});

export default ChatScreen;
