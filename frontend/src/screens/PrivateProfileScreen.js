import React from 'react';
import { View, Text } from 'react-native';
import Line from '../container/Line';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const PrivateProfileScreen = () => {
  return (
    <View style={{
      
     }}>
      <Text style={{
        color: 'gray',
        fontSize: 40,
        fontWeight: 'bold',
        marginLeft: 15,
        marginTop: 30,
      }}>프로필</Text>
      <Line style={{
        marginTop: 20, 
        width: '90%',
        marginHorizontal: '5%',
      }} />
      <View style={{
        marginTop: 5,
        width: '90%',
        marginHorizontal: '5%',
        flexDirection: 'row',
      }}>
        <MaterialIcons name="account-circle" size={60} color="gray" style={{marginRight: 2}}/>
        <View style={{flexDirection: 'column', justifyContent: 'center'}}>
          <Text style={{fontSize: 14}}>주최자</Text>
          <Text style={{fontSize: 12}}>Show profile</Text>
          <MaterialIcons name="chevron-right" size={20} color="gray"/>
        </View>
      </View>
    </View>
  );
};

export default PrivateProfileScreen;
