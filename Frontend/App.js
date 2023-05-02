import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import {ScrollView, TextInput} from 'react-native';
const App = () => {
  return (
    <ScrollView>
      <Text>로그인</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
        }}
        defaultValue="ID"
      />
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
        }}
        defaultValue="Password"
      />
    </ScrollView>
  );
};
export default App;
