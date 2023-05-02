import React from 'react';
import {View, Text, Button} from 'react-native';

const HomeScreen = ({navigation})=> {
  return (
    <View>
      <Text>Home Screen</Text>
      <Button
        title="Go to Second Screen"
        onPress={() => navigation.navigate('Second')}
      />
    </View>
  );
}
export default HomeScreen;