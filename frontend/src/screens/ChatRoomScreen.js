import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

const ChatRoomScreen = ({ route }) => {
  const { partyName, isHost } = route.params || {};
  const [messages, setMessages] = useState([]);
  const [pinnedMessage, setPinnedMessage] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = () => {
    // 채팅방 진입 시 초기 메시지를 불러오는 로직을 작성합니다.
    // 필요한 API 호출 또는 초기 데이터 설정을 수행합니다.
    // 가짜 데이터를 예시로 작성합니다.
    const initialMessages = [
      {
        _id: 1,
        text: '안녕하세요!',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: '참가자1',
        },
      },
      {
        _id: 2,
        text: '안녕하세요!',
        createdAt: new Date(),
        user: {
          _id: 3,
          name: '참가자2',
        },
      },
      {
        _id: 3,
        text: '안녕하세요!',
        createdAt: new Date(),
        user: {
          _id: 4,
          name: '참가자3',
        },
      },
      // 추가적인 초기 메시지 데이터...
    ];
    setMessages(initialMessages);
  };

  const onSend = (newMessages = []) => {
    // 채팅 메시지 전송 로직을 작성합니다.
    // 필요한 API 호출 또는 상태 업데이트를 수행합니다.
    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
  };

  const handleLongPress = (context, message) => {
    // 고정 메시지 기능을 구현합니다.
    if (message.user._id === 1) {
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

const CustomToolbar = (props) => {
  return (
    <View style={{ flex: 1 }}>
      {renderChatHeader()}
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{
          _id: 1,
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
}
export default ChatRoomScreen;
