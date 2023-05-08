import React, {useState} from 'react';
import {View, Button, Platform, Text, TextInput,TouchableOpacity, Alert} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import CameraScreen from './CameraScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'react-native-uuid';


const AddScreen = ({navigation,route}) => {
  const { address,longitude,latitude } = route.params || {};

  const [date, setDate] = useState(new Date());
  const [date2, setDate2] = useState(new Date());
  const [time, setTime] = useState();
  const [show, setShow] = useState(false);
  const [partyName, setPartyName] = useState('');
  const [numOfPeople, setNumOfPeople] = useState('');
  const [description, setDescription] = useState('');
  const [mode, setMode] = useState('date');
  
  const handleCreate = async() => {
    
    if(!address || !partyName || !numOfPeople || !description || !date ) {
      Alert.alert('오류', '입력되지 않은 항목이 있습니다.');
    } else {
      
      navigation.navigate('Map');
      const data = { address, longitude, latitude, date2, time, partyName, numOfPeople, description };
      try {
        await AsyncStorage.setItem('partyData',JSON.stringify(data));
        navigation.navigate('Map');
      }catch(e){
        console.log(e)
      }
    }
  } 
  const handleClearAsyncStorage = async () => {
    try {
      await AsyncStorage.removeItem('partyData');
      Alert.alert('알림', '저장된 데이터가 삭제되었습니다.');
    } catch(e) {
      console.log(e);
    }
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    const currentDate2 = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setDate2(currentDate2.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' }))
    console.log('aaD',currentDate.toLocaleDateString());
    console.log("AAd",currentDate.toLocaleTimeString())
    setTime(currentDate.toLocaleTimeString());

  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => showMode('date');
  const showTimepicker = () => showMode('time');

  return (
    <View>
      <View>
        <Button onPress={showDatepicker} title="Show date picker!" />
        <Text>선택한 날짜: {date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}</Text>
        
      </View>
      <View>
        <Button onPress={showTimepicker} title="Show time picker!" />
        <Text>선택한 시간: {mode === 'time' && date.toLocaleTimeString()}</Text>
        
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      <View>
        <Text>파티 이름:</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={text => setPartyName(text)}
          value={partyName}
        />
        <Text>인원 수:</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={text => setNumOfPeople(text)}
          value={numOfPeople}
          keyboardType={'numeric'}
        />
        <Text>파티 소개:</Text>
        <TextInput
          style={{height: 150, borderColor: 'gray', borderWidth: 1}}
          onChangeText={text => setDescription(text)}
          value={description}
        />
      </View>
      <CameraScreen />
      <TouchableOpacity onPress={() => navigation.navigate('Map2')}>
        <Text>위치 선택</Text>
      </TouchableOpacity>
      <Text>{address}</Text>
      <TouchableOpacity onPress={handleCreate}>
        <Text>생성하기</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleClearAsyncStorage}>
    <Text>저장된 데이터 삭제</Text>
  </TouchableOpacity>
      {/* <HomeScreen
        address={address}
        partyName={partyName}
        numOfPeople={numOfPeople}
        description={description}
        date={date.toLocaleDateString()}
        time= {date.toLocaleTimeString()}
        /> */}
    </View>
  );
};

export default AddScreen;
