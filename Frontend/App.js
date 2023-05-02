import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
const App = () => {
  return (
    <View>
      <Text>로그인</Text>
      <Text>app.tsx랑 app.js파일 두개여서 하나 지움</Text>
      <Text>또 술 먹니</Text>
      <MyButton />
      <MyButton />
    </View>
  );
};

const MyButton = () => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: '#3498db',
        padding: 16,
        margin: 10,
        borderRadius: 8,
      }}
      onPress={() => alert('Click!!!')}>
      <Text style={{color: 'white', fontSize: 24}}>d Button</Text>
    </TouchableOpacity>
  );
};
export default App;
