import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { styles } from './Styles/LoginStyles';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const handleLogin = async () => {
    // navigation.navigate('BottomTab', { screen: 'Home' });
    try {
      // 이메일과 비밀번호를 백엔드로 전송하여 로그인 처리합니다.
      const response = await axios.post('http://ec2-13-209-74-82.ap-northeast-2.compute.amazonaws.com:8080/api/User', {
        email: email,
        password: password,
      });

      // 로그인이 성공적으로 처리되었을 때의 로직을 작성합니다.
      console.log(response.data); // 서버로부터 받은 응답 데이터 출력

      // HomeScreen으로 이동
      navigation.navigate('BottomTab', { screen: 'Home' });
    } catch (error) {
      // 로그인 요청이 실패하였을 때의 예외 처리 로직을 작성합니다.
      console.error(error);
    }
  };

  const handleRegister = () => {
    // RegisterPage로 이동
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="이메일"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>회원가입</Text>
      </TouchableOpacity>
    </View>
  );
}
