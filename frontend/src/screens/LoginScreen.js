import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
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

  const handleLogin = () => {
    // 로그인 처리 코드 작성

    // HomeScreen으로 이동
    navigation.navigate('BottomTab',{screen:'Home'});
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
