import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity ,Text} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { styles } from './Styles/LoginStyles';
const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const navigation = useNavigation();
  const registerUser = async () => {
    try {
      const response = await axios.post('http://ec2-user@ip-172-31-40-3/api/UserController', {
        name: name,
        email: email,
        password: password,
        birthDay: birthDay,
      });
      
      // 회원가입이 성공적으로 처리되었을 때의 로직을 작성합니다.
      console.log(response.data); // 서버로부터 받은 응답 데이터 출력
      navigation.navigate('Login')
    } catch (error) {
      // 회원가입 요청이 실패하였을 때의 예외 처리 로직을 작성합니다.
      console.error(error);
    }
  };

  return (
    <>
      <TextInput
        placeholder="이름"
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput
        placeholder="이메일"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        placeholder="비밀번호"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <TextInput
        placeholder="생년월일"
        value={birthDay}
        onChangeText={text => setBirthDay(text)}
      />
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={registerUser}>
        <Text style={styles.buttonText}>회원가입</Text>
      </TouchableOpacity>
    </View>
    </>
  );
};

export default RegisterScreen;
