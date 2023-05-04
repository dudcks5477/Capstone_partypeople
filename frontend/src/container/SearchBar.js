import React, {useState} from 'react';
import {View, TextInput} from 'react-native';

export default function SearchBar() {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    // 검색 버튼을 눌렀을 때 처리할 코드
    console.log(query);
  };

  return (
    <View style={{flexDirection: 'row'}}>
      <TextInput
        style={{ 
          flex:1, 
          height: 56,
          borderWidth: 1,
          borderRadius: 13,
          marginTop: 46,
          marginLeft: 14,
          marginRight: 14,
        }}
        value={query}
        onChangeText={setQuery}
        placeholder='언제든 파티 찾기'
        autoCapitalize='none'
        autoCorrect={false}
      />
    </View>
  )
}