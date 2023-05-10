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
    />
  );
};

export default ChatRoomScreen;
