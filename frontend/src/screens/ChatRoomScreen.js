import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import axios from 'axios';

const ChatRoomScreen = ({ route }) => {
  const { partyName, isHost, chatRoomId } = route.params || {};
  const [messages, setMessages] = useState([]);
  const [pinnedMessage, setPinnedMessage] = useState(null);
  const [userId, setUserId] = useState(''); // 사용자의 userId를 저장합니다.

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = () => {
    // 서버로부터 채팅 메시지를 가져오는 API 호출을 수행합니다.
    // chatRoomId를 사용하여 해당 채팅방의 메시지를 가져옵니다.
    // 가져온 메시지를 setMessages를 통해 설정합니다.
    // 예시:
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
    // 사용자가 새로운 메시지를 보낼 때 호출되는 함수입니다.
    // newMessages는 GiftedChat이 전달하는 메시지 객체입니다.
    // 서버로 메시지를 전송하고, 서버로부터 전달받은 메시지를 GiftedChat에서 사용하는 형식으로 변환하여 messages 상태를 업데이트합니다.
    const formattedMessages = newMessages.map((message) => ({
      id: message._id,
      content: message.text,
      createdAt: message.createdAt.toISOString(),
      senderId: userId,
      senderName: isHost ? '호스트' : '참가자',
      chatRoomId: chatRoomId,
    }));

    // API 호출을 통해 서버로 메시지를 전송합니다.
    axios
      .post('http://your-ec2-instance-url/api/chatRooms/messages', formattedMessages)
      .then((response) => {
        // 서버로부터 전달받은 메시지를 GiftedChat에서 사용하는 형식으로 변환하여 messages 상태를 업데이트합니다.
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

  const handleLongPress = (context, message) => {
    // 메시지를 길게 눌렀을 때 호출되는 함수입니다.
    // 고정 메시지 기능을 구현할 수 있습니다.
    if (message.user._id === userId) {
      // 자신이 보낸 메시지만 고정할 수 있도록 설정합니다.
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
    // 채팅방 상단에 고정된 메시지를 표시합니다.
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
