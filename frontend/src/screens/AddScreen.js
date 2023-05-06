import React, { useState } from 'react';
import { View, Button, Platform, Text, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddScreen = () => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [partyName, setPartyName] = useState('');
  const [numOfPeople, setNumOfPeople] = useState('');
  const [description, setDescription] = useState('');
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const [mode, setMode] = useState('date');

  return (
    <View>
      <View>
        <Button onPress={showDatepicker} title="Show date picker!" />
        <Text>선택한 날짜: {date.toLocaleDateString()}</Text>
      </View>
      <View>
        <Button onPress={showTimepicker} title="Show time picker!" />
        <Text>선택한 시간: {mode === 'time' && date.toLocaleTimeString()}{'\n'}</Text>
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
        <Text>
          파티 이름:
        </Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => setPartyName(text)}
            value={partyName}
          />
        <Text>
          인원 수:
        </Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => setNumOfPeople(text)}
            value={numOfPeople}
            keyboardType={'numeric'}
          />
          <Text>
          파티 소개:
        </Text>
          <TextInput
            style={{ height: 150, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => setDescription(text)}
            value={description}
          />
        
      </View>
    </View>
  );
};

export default AddScreen;
