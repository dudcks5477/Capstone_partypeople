import React, {useState} from 'react';
import {View, Button, Platform, Text, TextInput,TouchableOpacity, Alert} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import CameraScreen from './CameraScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

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
  
  const handleCreate = async () => {
    if (!address || !partyName || !numOfPeople || !description || !date) {
      Alert.alert('오류', '입력되지 않은 항목이 있습니다.');
    } else {
      const data = {
        address,
        longitude,
        latitude,
        date2,
        time,
        partyName,
        numOfPeople,
        description,
      };
  
      try {
        const response = await axios.post('http://localhost:8080/api/party', data);
        
        if (response.status === 200) {
          // 데이터가 성공적으로 전송되었을 때의 처리 로직
          navigation.navigate('Map');
        } else {
          // 요청이 실패했을 때의 처리 로직
          Alert.alert('오류', '데이터 전송에 실패했습니다.');
        }
      } catch (error) {
        // 예외 발생 시의 처리 로직
        console.log(error);
        Alert.alert('오류', '데이터 전송 중 예외가 발생했습니다.');
      }
    }
  };

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
    </View>
  );
};

export default AddScreen;
