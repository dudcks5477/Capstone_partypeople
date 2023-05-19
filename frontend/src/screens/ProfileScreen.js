import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Rating } from 'react-native-ratings'; 
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Line from '../container/Line';

const ProfileScreen = () => {

  const handleGoBack = () => {
    navigation.goBack(); // 이전으로 돌아가기
  }

  return (
    <View>
      {/* onPress부분 누르지 말기 에러뜸 */}
      <TouchableOpacity onPress={handleGoBack} style={{
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        marginHorizontal: '5%',
        marginTop: 20,
        marginBottom: 10}}>
        <MaterialIcons name="chevron-left" size={40} color="gray" style={{ marginRight: 2}} />
        <Text style={{
          color: 'gray',
          fontSize: 40,
          fontWeight: 'bold',
        }}>프로필</Text>
      </TouchableOpacity>

      <Line/>
      <View style={{
        width: '90%',
        marginHorizontal: '5%',
        marginTop: 10,
        flexDirection: 'row'
      }}>
        <MaterialIcons name="account-circle" size={60} color="gray" style={{marginRight: 2}}/>
        <View style={{
            marginLeft: 50,
            alignItems: 'center',
          }}>
          <Text >Subscribers</Text>
          {/* 구독자 수 기능 */}
          <Text style={{
            marginTop: 5
          }}>10</Text>
        </View>
        
        {/* 인증 마크 왕관 못찾는 중 */}
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <View style={{
            borderWidth: 1,
            borderColor: '#e1d45a',
            borderRadius: 5,
            flexDirection: 'row',
            padding: 2,
            height: 25,
            marginLeft: 10,
            backgroundColor: '#e1d45a'
          }}>
            <Text style={{ color: 'black', marginLeft: 5}}>ID certified</Text>
          </View>
          <View style={{
            borderWidth: 1,
            borderColor: '#e1d45a',
            borderRadius: 5,
            flexDirection: 'row',
            padding: 2,
            height: 25,
            marginLeft: 10,
            marginTop: 4,
            backgroundColor: '#e1d45a'
          }}>
            <Text style={{ color: 'black', marginLeft: 5}}>cellphone certified</Text>
          </View>
        </View>

      </View>
      <View style={{ alignSelf: 'flex-start', marginLeft: '5%', marginTop: 10}}>
        {/* Rating 패키지 다운로드 해야함 */}
        <Rating
        imageSize={20}
        readonly
        startingValue={5}
        style={{ paddingVertical: 10,}}
        />
      </View>
      <View style={{
        width: '90%',
        marginHorizontal: '5%'
      }}>
        <Text>Recent Party / Host</Text>
        {/* 이미지 */}
        <Text>Comment</Text>
      </View>
      <Line style={{marginTop: 40}}/>
      <View style={{
        width: '90%',
        marginHorizontal: '5%',
        marginTop: 5
      }}>
        <Text>Recent Party / Participate In</Text>
        {/* 이미지 */}
        <Text>Comment</Text>
      </View>
    </View>
  );
};

export default ProfileScreen;
