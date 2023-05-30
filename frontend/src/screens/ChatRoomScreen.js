import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import axios from 'axios';

const ChatRoomScreen = ({ route }) => {
  const { partyName, isHost, chatRoomId } = route.params || {};
  const [messages, setMessages] = useState([]);
  const [pinnedMessage, setPinnedMessage] = useState(null);
  const [userId, setUserId] = useState(''); // 사용자 userId 저장 

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = () => {
    // 서버로부터 채팅 메시지를 가져오는 API 호출을 수행
    axios
      .get(`http://your-ec2-instance-url/api/chatRooms/${chatRoomId}/messages`)
      .then((response) => {
        const formattedMessages = response.data.map((message) => ({
          _id: message.id,
          text: message.content,
          createdAt: new Date(message.createdAt),
          user: {
            _id: message.senderId,
            name: message.senderName,
          },
        }));
        setMessages(formattedMessages);
      })
      .catch((error) => {
        console.error('Error fetching messages:', error);
      });
  };

  const onSend = (newMessages = []) => {
    // 사용자가 새로운 메시지를 보낼 때 호출되는 함수
    const formattedMessages = newMessages.map((message) => ({
      id: message._id,
      content: message.text,
      createdAt: message.createdAt.toISOString(),
      senderId: userId,
      senderName: isHost ? '호스트' : '참가자',
      chatRoomId: chatRoomId,
    }));
    axios
      .post('http://your-ec2-instance-url/api/chatRooms/messages', formattedMessages)
      .then((response) => {
        const formattedResponse = response.data.map((message) => ({
          _id: message.id,
          text: message.content,
          createdAt: new Date(message.createdAt),
          user: {
            _id: message.senderId,
            name: message.senderName,
          },
        }));
        setMessages((prevMessages) => GiftedChat.append(prevMessages, formattedResponse));
      })
      .catch((error) => {
        console.error('Error sending message:', error);
      });
  };

  // 공지사항
  const handleLongPress = (context, message) => {
    if (message.user._id === userId) {
      Alert.alert(
        '고정 메시지',
        '이 메시지를 상단에 고정하시겠습니까?',
        [
          { text: '아니오' },
          {
            text: '네',
            onPress: () => {
              setPinnedMessage(message);
            },
          },
        ],
        { cancelable: true }
      );
    }
  };

  const renderChatHeader = () => {
    if (pinnedMessage) {
      return (
        <View style={styles.pinnedMessageContainer}>
          <Text style={styles.pinnedMessageText}>{pinnedMessage.text}</Text>
        </View>
      );
    }
    return null;
  };

  return (
    <View style={{ flex: 1 }}>
      {renderChatHeader()}
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{
          _id: userId,
          name: isHost ? '호스트' : '참가자',
        }}
        onLongPress={handleLongPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  pinnedMessageContainer: {
    backgroundColor: 'lightgray',
    padding: 10,
  },
  pinnedMessageText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ChatRoomScreen;
