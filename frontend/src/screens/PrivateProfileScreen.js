import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Line from '../container/Line';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const PrivateProfileScreen = () => {
  
  const onItemPress = (itemName) => {
    console.log(`${itemName} clicked`);
    
  }

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
        </View>
      </View>
      <View style={{
        width: '90%', 
        marginHorizontal: "5%",
      }}>
        <Text style={{
          marginTop: 5,
          fontSize: 20,
          fontWeight: 'bold'}}>참석 예정</Text>
          {/* 여기에 파티 요약본 넣어야함 */}
      </View>
      <Line/>
      <View style={{
        width: '90%', 
        marginHorizontal: "5%",
      }}>
        <Text style={{
          marginTop: 5,
          fontSize: 20,
          fontWeight: 'bold'}}>세팅</Text>
        <TouchableOpacity onPress={() => onItemPress('Personal Information')}>
          <Text>Personal Information</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onItemPress('Login & Security')}>
          <Text>Login & Security</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onItemPress('Payments and payouts')}>
          <Text>Payments and payouts</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onItemPress('Taxes')}>
          <Text>Taxes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PrivateProfileScreen;
