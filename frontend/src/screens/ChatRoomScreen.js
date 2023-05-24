import React, { useState } from 'react';
import { GiftedChat, InputToolbar, Composer, Send } from 'react-native-gifted-chat';
import { View, Text } from 'react-native';

const CustomToolbar = (props) => {
  return (
      <InputToolbar {...props} containerStyle={{ backgroundColor: 'black', justifyContent: 'flex-end' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Composer {...props} textInputStyle={{ color: 'white' }} />
              <Send {...props} alwaysShowSend>
                  <View style={{ marginRight: 10, marginBottom: 0 }}>
                      <Text style={{ color: 'white' }}>Send</Text>
                  </View>
              </Send>
          </View>
      </InputToolbar>
  );
};

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
            renderInputToolbar={(props) => <CustomToolbar {...props} />}
            textInputProps={{
              placeholder: "Write a message",
              color: 'white'
            }}
        />
    );
};

export default ChatRoomScreen;
