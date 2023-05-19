// PartyItem.js
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PartyItem = ({ party }) => {
  const navigation = useNavigation();
  
  const handlePress = () => {
    navigation.navigate('PartyDetail', { partyId: party.id }); // 파티 상세 페이지로 이동
  }

  return (
    <TouchableOpacity onPress={handlePress}>
      <View>
        <Image source={{ uri: party.imageUrl }} /> {/* 파티 이미지 */}
        <Text>{party.name}</Text> {/* 파티 이름 */}
        <Text>{party.comment}</Text> {/* 파티에 대한 댓글 */}
      </View>
    </TouchableOpacity>
  );
}

export default PartyItem;
