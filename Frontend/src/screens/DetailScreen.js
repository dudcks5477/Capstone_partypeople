//screens/HomeScreen.js import React from 'react';
import {Text, View, Button} from 'react-native';
function DetailScreen({navigation}) {
  return (
    <View>
      <Text>Detail</Text>
      <Button title="Login 열기" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}
export default DetailScreen;
