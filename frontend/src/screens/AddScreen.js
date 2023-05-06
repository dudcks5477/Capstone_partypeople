import React, {useState} from 'react';
import {View, Button, Platform, Text, TextInput,TouchableOpacity, Alert} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import CameraScreen from './CameraScreen';

const AddScreen = ({navigation, route}) => {
  const { address,longitude,latitude } = route.params || {};
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [partyName, setPartyName] = useState('');
  const [numOfPeople, setNumOfPeople] = useState('');
  const [description, setDescription] = useState('');
  const [mode, setMode] = useState('date');
  
  const handleCreate = () => {
    if(!address || !partyName || !numOfPeople || !description || !date) {
      Alert.alert('오류', '입력되지 않은 항목이 있습니다.');
    } else {
      navigation.navigate('Map', {
        address : address,
        longitude: longitude,
        latitude: latitude,
        partyName: partyName,
        numOfPeople: numOfPeople,
        description: description,
        date: date.toLocaleDateString(),
        time: date.toLocaleTimeString(),
      });
    }
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
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
        <Text>선택한 날짜: {date.toLocaleDateString()}</Text>
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
    </View>
  );
};

export default AddScreen;
