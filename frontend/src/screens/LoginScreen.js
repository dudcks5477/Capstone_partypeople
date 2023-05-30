import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Keyboard} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // AsyncStorage 추가

import { styles } from './Styles/LoginStyles';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth'

import Line from '../container/Line';
import axios from 'axios';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keyboardStatus, setKeyboardStatus] = useState(false);

  useEffect(() => {
    const keyboardDidshowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardStatus(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardStatus(false);
      }
    );

    return () => {
      keyboardDidshowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '163393566536-n7lmi50uqonka52nsbhpbjdequ253r5e.apps.googleusercontent.com',
    });
  }, []);

  const onGoogleButtonPress = async () => {
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  };

  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://3.35.21.149:8080/users/login', {
        email: email,
        password: password,
      });

      const userId  = response.data.id; // 토큰과 사용자 ID 추출
      
      // AsyncStorage에 토큰 저장
      await AsyncStorage.setItem('userId', JSON.stringify(userId));


      // userId를 위해 사용할 수 있습니다.
      console.log("a",userId);

      // HomeScreen으로 이동
      navigation.navigate('BottomTab', { screen: 'Home' });
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      {!keyboardStatus && <Text style={styles.loginText}>로그인</Text>}
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

      <Line style={{ width: 333, marginBottom: 10 }} />

      <Text style={{ fontSize: 16, color: '#fff', fontWeight: 'bold', marginBottom: 10 }}>
        SNS 로그인
      </Text>

      <GoogleSigninButton onPress={() => onGoogleButtonPress()} />
    </View>
  );
}
