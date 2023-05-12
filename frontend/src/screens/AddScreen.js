import React, {useState} from 'react';
import {View, Button, Platform, Text, TextInput,TouchableOpacity, Alert, ScrollView, Image} from 'react-native';
import HomeScreen from './HomeScreen';
import CameraScreen from './CameraScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Line from '../container/Line';

const AddScreen = ({navigation,route}) => {
  const { address,longitude,latitude } = route.params || {};

  const [date, setDate] = useState(new Date());
  const [date2, setDate2] = useState(new Date());
  const [time, setTime] = useState();
  const [show, setShow] = useState(false);
  const [partyName, setPartyName] = useState('');
  const [numOfPeople, setNumOfPeople] = useState('');
  const [description, setDescription] = useState('');
  const [coin, setCoin] = useState('');
  const [mode, setMode] = useState('date');
  const [dateSelected, setDateSelected] = useState(false);

  const handleGoBack = () => {
    navigation.goBack(); // 이전으로 돌아가기
  }
  
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
    setDateSelected(true);
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

  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [imageSource, setImageSource] = useState(null);

  const openCamera = () => { setIsCameraVisible(true); }

  return (
    <View>

      <TouchableOpacity onPress={handleGoBack} style={{
        flexDirection:"row", 
        alignItems:'center', 
        marginTop: 20,
        width: '90%',
        marginHorizontal: '3%'
        }}>
        <MaterialIcons name="chevron-left" size={24} color="black" style={{ marginRight: 2}}/>
        <Text style={{fontSize: 25}}>생성</Text>
      </TouchableOpacity>

      <Line style={{marginTop: 15, marginBottom: 10}}/>

      <View style = {{
        width: '90%',
        marginHorizontal: '5%'
      }}>
        <View style={{flexDirection:'row', alignItems: 'center'}}>
          <Text style={{marginRight: 30}}>파티이름</Text>
          <TextInput
            style={{
              flex: 1,
              height: 39, 
              borderColor: 'gray', 
              borderWidth: 1,
              borderRadius: 6
            }}
            onChangeText={text => setPartyName(text)}
            value={partyName}
          />
        </View>
        
        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
          <Text style={{marginRight: 30}}>파티시간</Text>
          <View style={{flex: 1, marginRight: 10}}>
            <TouchableOpacity onPress={showDatepicker} style={{
              height: 39,
              borderColor: 'gray',
              borderWidth: 1,
              borderRadius: 6,
              justifyContent: 'center',
              alignItems: 'center',
              paddingLeft: 10,
            }}>
              <Text>
                {dateSelected 
                  ? date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric'}) 
                  : "날짜"
                }
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1}}>
            <TouchableOpacity onPress={showTimepicker} style={{
              flex: 1,
              height: 39,
              borderColor: 'gray',
              borderWidth: 1,
              borderRadius: 6,
              justifyContent: 'center',
              alignItems: 'center',
              paddingLeft: 10,
            }}>
              <Text>
                {date && mode === 'time' 
                  ? date.toLocaleTimeString('ko-KR', { hour: '2-digit',
                  minute: '2-digit' })
                  : "시간"
                }
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
          <Text style={{marginRight: 30}}>파티장소</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Map2')}
            style={{
                flex: 1,
                height: 39, 
                borderColor: 'gray', 
                borderWidth: 1,
                justifyContent: 'center',
                borderRadius: 6,
                paddingLeft: 10,
              }}
            >
              <Text>{address || "위치 선택"}</Text>
          </TouchableOpacity>
        </View>
        
        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
          <Text style={{marginRight: 30}}>최대인원</Text>
          <TextInput
            style={{
                flex: 1,
                height: 39, 
                borderColor: 'gray', 
                borderWidth: 1,
                borderRadius: 6
              }}
            value={numOfPeople}
            keyboardType={'numeric'}
            onChangeText={text => {
              if (parseInt(text) <= 100) {
                setNumOfPeople(text)
              }
            }}
          />
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
          <Text style={{marginRight: 30}}>파티코인</Text>
          <TextInput
            style={{
                flex: 1,
                height: 39, 
                borderColor: 'gray', 
                borderWidth: 1,
                borderRadius: 6
              }}
            value={coin}
            keyboardType={'numeric'}
            onChangeText={text => { setCoin(text)}}
          />
        </View>
      </View>

      <Line style={{marginTop: 15, marginBottom: 10}}/>

      <View style={{
        width: '90%',
        marginHorizontal: '5%'
      }}>
        <Text>파티 소개</Text>
        <TextInput
          style={{
            height: 150, 
            borderColor: 'gray', 
            borderWidth: 1,
            marginTop: 10,
            borderRadius: 6
          }}
          onChangeText={text => setDescription(text)}
          value={description}
        />
      </View>

      <Line style={{marginTop: 15, marginBottom: 10}}/>

      <View style={{
        width: '90%',
        marginHorizontal: '5%',
      }}>
        <Text>사진 등록</Text>
        <View style={{flexDirection: 'row', marginTop: 10,alignItems:"center"}}>
          <View style={{
            borderColor: 1,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            height: 69,
            width: 80,
            backgroundColor: "#ccc",
            marginRight: 10
          }}>
            <MaterialIcons name="photo-camera" size={70} color="gray"/>
          </View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ flexDirection: 'row' }}
          >
            <View style={{
              borderColor: 1,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
              height: 69,
              width: 80,
              backgroundColor: "#ccc",
              marginRight: 3
            }}>
            </View>
            <View style={{
              borderColor: 1,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
              height: 69,
              width: 80,
              backgroundColor: "#ccc",
              marginRight: 3
            }}>
            </View>
            <View style={{
              borderColor: 1,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
              height: 69,
              width: 80,
              backgroundColor: "#ccc",
              marginRight: 3
            }}>
            </View>
            <View style={{
              borderColor: 1,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
              height: 69,
              width: 80,
              backgroundColor: "#ccc",
              marginRight: 3
            }}>
            </View>
          </ScrollView>
          {isCameraVisible && <CameraScreen setImageSource={setImageSource} />}
          {imageSource && <Image source={imageSource} style={{width: 300, height:300}} />}
        </View>
      </View>

      <TouchableOpacity 
        onPress={handleCreate} 
        style={{
          marginTop: 10, 
          justifyContent: 'center', 
          alignItems:'center'}}>
        <Text style={{
          borderColor: 1,
          borderRadius: 10,
          backgroundColor: '#ccc',
          width: 147,
          height: 43,
          lineHeight: 43,
          textAlign: 'center',
        }}>생성하기</Text>
      </TouchableOpacity>


      {/* {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )} */}
      
      

      {/* <Text>{address}</Text>
      
      <TouchableOpacity onPress={handleClearAsyncStorage}>
        <Text>저장된 데이터 삭제</Text>
      </TouchableOpacity> */}
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
