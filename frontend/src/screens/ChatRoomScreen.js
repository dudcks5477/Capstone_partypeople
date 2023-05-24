import React, { useState } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';


const ChatRoomScreen = ({ route }) => {
  const { partyName } = route.params;
  const [messages, setMessages] = useState([]);

  function onSend(newMessages = []) {
    setMessages(GiftedChat.append(messages, newMessages));
  }

  return (
      <GiftedChat
        messages={messages}
        onSend={newMessages => onSend(newMessages)}
        user={{
          _id: 1,
          name: partyName,
        }}
        placeholder='메시지를 입력하세요.'
        placeholderTextColor="#fff"
        textInputStyle={{
          backgroundColor: "#000",
          color: "#fff",
          marginLeft: 10
        }}
      />
  );
};

export default ChatRoomScreen;
