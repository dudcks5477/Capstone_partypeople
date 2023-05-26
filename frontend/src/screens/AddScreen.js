import React, {useState} from 'react';
import {View, Button, Platform, Text, TextInput,TouchableOpacity, Alert, ScrollView, Image,Modal} from 'react-native';

// import CameraScreen from './CameraScreen';
import ImageCropPicker from 'react-native-image-crop-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Line from '../container/Line';

const AddScreen = ({navigation,route}) => {
  const { address,longitude,latitude } = route.params || {};
  const [imageSources, setImageSources] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(-1);
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [date2, setDate2] = useState(new Date());
  const [time, setTime] = useState();
  const [show, setShow] = useState(false);
  const [partyName, setPartyName] = useState('');
  const [numOfPeople, setNumOfPeople] = useState();
  const [description, setDescription] = useState('');
  const [coin, setCoin] = useState('');
  const [mode, setMode] = useState('date');
  const [dateSelected, setDateSelected] = useState(false);
  const handleImagesSelected = (images) => {
    setImageSources(images);
  };
  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    setModalVisible(true);
  };
  const handleModalClose = () => {
    setSelectedImageIndex(-1);
    setModalVisible(false);
  };
  const handleCameraPress = () => {
    ImageCropPicker.openPicker({
      multiple: true,
      mediaType: 'photo',
    })
      .then((selectedImages) => {
        if (selectedImages.length > 0) {
          handleImagesSelected(selectedImages);
        }
      })
      .catch((error) => {
        console.log('ImagePicker Error: ', error);
      });
  };
  const handleCreate = async () => {
    if (!address || !partyName || !numOfPeople || !description || !date ||imageSources.length === 0) {
      Alert.alert('오류', '입력되지 않은 항목이 있습니다.');
    } else {
      setDate2(date.toISOString().slice(0, 10))
      setTime(date.toISOString().slice(11, 19))
      console.log(date2)
      console.log(time)
      try {
        console.log(typeof(longitude))
        console.log(typeof(latitude))
        console.log(typeof(numOfPeople))
        console.log(typeof(time))
        console.log(typeof(date2))
        
        const data = {
          imageFile: imageSources.map((image, index) => ({
            uri: image.path,
            type: image.mime,
            name: `image_${index + 1}.jpg`,
          })
          ),
          partyLocation: address,
          longitude,
          latitude,
          partyDate: date2,
          partyTime: time,
          partyName,
          numOfPeople,
          content: description,

        };
        
        const storedUserId = JSON.parse(await AsyncStorage.getItem('userId'));

        
        console.log("sto",storedUserId)
        console.log(partyName)
        console.log(longitude)
        console.log(latitude)
        console.log(address)
        console.log(date2)
        console.log(time)
        console.log(numOfPeople)
        console.log(description)
        console.log(data.imageFile)
        // 파티 생성 요청 보내기
        const response = await axios.post(`http://3.35.21.149:8080/party/${storedUserId}`, {
        imageFile : data.imageFile,
        partyName : data.partyName,
        longitude : data.longitude,
        latitude : data.latitude,
        partyLocation : data.partyLocation,
        partyDate : data.partyDate,
        partyTime : data.partyTime,
        numOfPeople : data.numOfPeople,
        content : data.content,
      });
  
        if (response.status === 200) { 
          
          // 파티가 성공적으로 생성되었을 때의 처리 로직
          
           
          console.log("성공")
          navigate.navigation('MapScreen')
          // await AsyncStorage.setItem('partyId', JSON.stringify(partyId));
          // 채팅방 생성 요청 보내기
          // const chatRoomResponse = await axios.post('http://ec2-13-209-74-82.ap-northeast-2.compute.amazonaws.com:8080/chatRoom', {
          //   partyId: partyId,
          //   hostId: storedUserId // 현재 사용자의 아이디
          // }, {
          //   headers: {
          //     'Content-Type': 'application/json',
          //   },
          // });

        //   if (chatRoomResponse.status === 200) {
        //     // 채팅방이 성공적으로 생성되었을 때의 처리 로직
        //     const chatRoomData = chatRoomResponse.data;
        //     const chatRoomId = chatRoomData.id;
        //     console.log(`채팅방 생성 성공, ID: ${chatRoomId}`);
        //   } else {
        //     // 채팅방 생성 실패 처리 로직
        //     Alert.alert('오류', '채팅방 생성에 실패했습니다.');
        //   }

        // } else {
        //   // 파티 생성 실패 처리 로직
        //   Alert.alert('오류', '데이터 전송에 실패했습니다.');
        }
      } catch (error) {
        // 예외 발생 처리 로직
        console.error(error);
      }
    }
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
  
    setDateSelected(true);
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    
  };


  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => showMode('date');
  const showTimepicker = () => showMode('time');

  
  const handleGoBack = () => {
    navigation.goBack(); // 이전으로 돌아가기
  }

  return (
    <View style={{backgroundColor: '#222', flex: 1}}>

      <TouchableOpacity onPress={handleGoBack} style={{
        flexDirection:"row", 
        alignItems:'center', 
        marginTop: 20,
        width: '90%',
        marginHorizontal: '3%'
        }}>
        <MaterialIcons name="chevron-left" size={24} color="black" style={{ marginRight: 2, color: 'white'}}/>
        <Text style={{fontSize: 25, color: 'white', fontWeight: 'bold'}}>생성</Text>
      </TouchableOpacity>

      <Line style={{marginTop: 15, marginBottom: 10 }}/>

      <View style = {{
        width: '90%',
        marginHorizontal: '5%'
      }}>
        <View style={{flexDirection:'row', alignItems: 'center'}}>
          <Text style={{marginRight: 30, color: 'white'}}>파티이름</Text>
          <TextInput
            style={{
              flex: 1,
              height: 39, 
              borderColor: 'gray', 
              borderWidth: 1,
              borderRadius: 6,
              color: 'white'
            }}
            onChangeText={text => setPartyName(text)}
            value={partyName}
          />
        </View>
        
        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
          <Text style={{marginRight: 30, color: 'white'}}>파티시간</Text>
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
              <Text style={{color: 'white'}}>
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
              <Text style={{color: 'white'}}>
                {date && mode === 'time' 
                  ? date.toLocaleTimeString('ko-KR', { hour: '2-digit',minute: '2-digit' })
                  : "시간"
                }
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
          <Text style={{marginRight: 30, color: 'white'}}>파티장소</Text>
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
              <Text style={{color: 'white'}}>{address || "위치 선택"}</Text>
          </TouchableOpacity>
        </View>
        
        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
          <Text style={{marginRight: 30, color: 'white'}}>최대인원</Text>
          <TextInput
            style={{
                flex: 1,
                height: 39, 
                borderColor: 'gray', 
                borderWidth: 1,
                borderRadius: 6,
                color: 'white'
              }}
            value={numOfPeople}
            keyboardType={'numeric'}
            onChangeText={text => {
              const parsedNum = parseInt(text);
              if (!isNaN(parsedNum) && parsedNum <= 100) {
                setNumOfPeople(parsedNum);
              }
            }}
          />
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
          <Text style={{marginRight: 30, color: 'white'}}>파티코인</Text>
          <TextInput
            style={{
                flex: 1,
                height: 39, 
                borderColor: 'gray', 
                borderWidth: 1,
                borderRadius: 6,
                color: 'white'
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
        <Text style={{color: 'white'}}>파티 소개</Text>
        <TextInput
          style={{
            height: 150, 
            borderColor: 'gray', 
            borderWidth: 1,
            marginTop: 10,
            borderRadius: 6,
            color: 'white',
            textAlignVertical: 'top'
          }}
          multiline={true}
          onChangeText={text => setDescription(text)}
          value={description}
        />
      </View>

      <Line style={{marginTop: 15, marginBottom: 10}}/>

      <View style={{
        width: '90%',
        marginHorizontal: '5%',
      }}>
         <View>
         <Text style={{color: "white"}}>사진 등록</Text>
      <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
        <TouchableOpacity
          style={{
            borderColor: 1,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            height: 69,
            width: 80,
            backgroundColor: '#ccc',
            marginRight: 10,
          }}
          onPress={handleCameraPress}
        >
          <View style={{backgroundColor: "black", width: "100%", justifyContent: 'center', alignItems: 'center', borderRadius: 10}}>
            <MaterialIcons name="photo-camera" size={70} color="white" />
          </View>
        </TouchableOpacity>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ flexDirection: 'row' }}
        >
          {imageSources.map((image, index) => (
            <TouchableOpacity
              key={index}
              style={{
                borderColor: 1,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                height: 69,
                width: 80,
                backgroundColor: '#ccc',
                marginRight: 3,
              }}
              onPress={() => handleImageClick(index)}
            >
              <Image source={{ uri: image.path }} style={{ width: 80, height: 69, borderRadius: 10 }} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <ScrollView>
      
    </ScrollView>
    <Modal visible={modalVisible} onRequestClose={handleModalClose}>
      <View style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
        {selectedImageIndex !== -1 && (
          <TouchableOpacity onPress={handleModalClose}>
            <Image
              source={{ uri: imageSources[selectedImageIndex].path }}
              style={{ width: 300, height: 300, resizeMode: 'contain' }}
            />
          </TouchableOpacity>
        )}
      </View>
    </Modal>
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
          backgroundColor: 'white',
          width: 147,
          height: 43,
          lineHeight: 43,
          textAlign: 'center',
          fontSize: 15,
          fontWeight: 'bold'
        }}>생성하기</Text>
      </TouchableOpacity>


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
      
    
    </View>
  );
};

export default AddScreen;
