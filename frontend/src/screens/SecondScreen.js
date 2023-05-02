import React from 'react';
import {View, Text, Button} from 'react-native';

const SecondScreen = ({navigation}) => {
  return (
    <View>
      <Text>Second Screen</Text>
      <Button
        title="Go back to Home Screen"
        onPress={() => navigation.navigate("Home")}
      />
    </View>
  );
}
export default SecondScreen;