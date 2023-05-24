import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { styles } from './Styles/LoginStyles';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth'
import { axios } from 'axios';
import Line from '../container/Line';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
      '163393566536-n7lmi50uqonka52nsbhpbjdequ253r5e.apps.googleusercontent.com',
    });
  }, []);

  const onGoogleButtonPress = async () => {
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  };

  

  const navigation = useNavigation();
  

  const serverURL = 'http://ec2-13-209-74-82.ap-northeast-2.compute.amazonaws.com:8080';
  
  const handleLogin = async () => {
    // navigation.navigate('BottomTab', { screen: 'Home' });
    try {
      // 이메일과 비밀번호를 백엔드로 전송하여 로그인 처리합니다.
      const response = await axios.post('http://ec2-13-209-74-82.ap-northeast-2.compute.amazonaws.com:8080/users', {
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
      <Text style={styles.loginText}>로그인</Text>
      <View style={styles.inputContainer}>
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
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>회원가입</Text>
      </TouchableOpacity>

      <Line style={{width: 333, marginBottom: 10}}/>

      <Text style={{
        fontSize: 16, 
        color: '#fff', 
        fontWeight: 'bold', 
        marginBottom: 10}}>
          SNS 로그인
      </Text>

      <GoogleSigninButton onPress={() => onGoogleButtonPress()} />
    </View>
  );
}
