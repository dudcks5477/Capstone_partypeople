import React, {useState} from 'react';
import {View, Text, TextInput,TouchableOpacity, Alert, ScrollView, Image,Modal,StyleSheet} from 'react-native';
// import CameraScreen from './CameraScreen';
import ImageCropPicker from 'react-native-image-crop-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Line from '../container/Line';
import { styles } from './Styles/AddStyles'
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
  const [numOfPeople, setNumOfPeople] = useState('0');
  const [description, setDescription] = useState('');
  const [coin, setCoin] = useState('0');
  const [mode, setMode] = useState('date');
  const [storedUserId, setStoredUserId] = useState(null);
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
      
      const formData = new FormData();
      try {
        

        const storedUserId = JSON.parse(await AsyncStorage.getItem('userId'));
        
        imageSources.forEach((image, index) => {
          formData.append('images', {
            uri: image.path,
            type: image.mime,
            name: `image-${index + 1}.jpg`})
        });
        

        console.log(imageSources)
        console.log("Id", storedUserId);
        console.log("partyName : ", partyName, typeof(partyName));
        console.log("longitude : ", longitude, typeof(longitude));
        console.log("latitude : ", latitude, typeof(latitude));
console.log("partyLocation : ", address, typeof(address));
console.log("partyDate : ", date2, typeof(date2));
console.log("partyTime : ", time, typeof(time));
console.log("numOfPeople : ", numOfPeople, typeof(numOfPeople));
console.log("content : ", description, typeof(description));
console.log(formData);
        // 파티 생성 요청 보내기
        const response = await axios.post(`http://3.35.21.149:8080/party/${storedUserId}`,{
          partyLocation: address,
          longitude: longitude,
          latitude: latitude,
          partyDate: date2,
          partyTime: time,
          partyName: partyName,
          numOfPeople: numOfPeople,
          content: description,
        } );
        
        const partyId = response.data;
        
        console.log("d",response.data)
        const response1 = await axios.post(`http://3.35.21.149:8080/party/${partyId}/images`, formData, {
        headers: {
    'Content-Type': 'multipart/form-data',
      },
      });
    console.log(response.status)
        if (response.status === 201 ) { 
          
          // 파티가 성공적으로 생성되었을 때의 처리 로직
          
          console.log("성공")
          navigation.navigate('MapScreen')
          // await AsyncStorage.setItem('partyId', JSON.stringify(response.date.id));
          // // 채팅방 생성 요청 보내기
          // const chatRoomResponse = await axios.post('http://3.35.21.149:8080/chatRoom', {
          //   partyId: partyId,
          //   hostId: storedUserId // 현재 사용자의 아이디
          // }, {
          //   headers: {
          //     'Content-Type': 'application/json',
          //   },
          // });
          
          // if (chatRoomResponse.status === 200) {
          //   // 채팅방이 성공적으로 생성되었을 때의 처리 로직
          //   const chatRoomData = chatRoomResponse.data;
          //   const chatRoomId = chatRoomData.id;
          //   console.log(`채팅방 생성 성공, ID: ${chatRoomId}`);
          // } else {
          //   // 채팅방 생성 실패 처리 로직
          //   Alert.alert('오류', '채팅방 생성에 실패했습니다.');
          // }

        } else {
          // 파티 생성 실패 처리 로직
          Alert.alert('오류', '데이터 전송에 실패했습니다.');
        }
      } catch (error) {
        // 예외 발생 처리 로직
        console.error("aa",error);
      }
    }
  }

  const onChange = (event, selectedDate) => {
    if (selectedDate) {
      const currentDate = selectedDate || date;
      setShow(false);
      setDate(currentDate);  
      setDateSelected(true);
    }
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
    <View style={styles.container}>
      <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
        <MaterialIcons name="chevron-left" size={24} color="white" style={styles.backButtonIcon} />
        <Text style={styles.title}>생성</Text>
      </TouchableOpacity>

      <View style={styles.line} />

      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>파티이름</Text>
          <TextInput style={styles.textInput} onChangeText={text => setPartyName(text)} value={partyName} />
        </View>

        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>파티시간</Text>
          <View style={styles.dateInput}>
            <TouchableOpacity onPress={showDatepicker}>
              <Text style={{ color: 'white' }}>
                {dateSelected ? date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' }) : "날짜"}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.timeInput}>
            <TouchableOpacity onPress={showTimepicker}>
              <Text style={{ color: 'white' }}>
                {date && mode === 'time' ? date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }) : "시간"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>파티장소</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Map2')} style={styles.locationInput}>
            <Text style={{ color: 'white' }}>{address || "위치 선택"}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>최대인원</Text>
          <TextInput
            style={styles.textInput}
            value={numOfPeople.toString()}
            keyboardType={'numeric'}
            onChangeText={text => {
              const parsedNum = parseInt(text);
              if (!isNaN(parsedNum) && parsedNum <= 100) {
                setNumOfPeople(parsedNum);
              }
            }}
          />
        </View>

        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>파티코인</Text>
          <TextInput
            style={styles.textInput}
            value={coin}
            keyboardType={'numeric'}
            onChangeText={text => { setCoin(text) }}
          />
        </View>
      </View>

      <View style={styles.line} />

      <View style={styles.inputContainer}>
        <Text style={{ color: 'white' }}>파티 소개</Text>
        <TextInput
          style={styles.partyDescription}
          multiline={true}
          onChangeText={text => setDescription(text)}
          value={description}
        />
      </View>

      <View style={styles.line} />

      <View style={styles.inputContainer}>
        <View>
          <Text style={{ color: "white" }}>사진 등록</Text>
          <View style={styles.photoUpload}>
            <TouchableOpacity style={styles.photoCameraButton} onPress={handleCameraPress}>
              <View style={{ backgroundColor: "black", width: "100%", justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
                <MaterialIcons name="photo-camera" size={70} color="white" />
              </View>
            </TouchableOpacity>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexDirection: 'row' }}>
              {imageSources.map((image, index) => (
                <TouchableOpacity key={index} style={styles.photoThumbnail} onPress={() => handleImageClick(index)}>
                  <Image source={{ uri: image.path }} style={{ width: 80, height: 69, borderRadius: 10 }} />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
        <ScrollView>
          {/* Content */}
        </ScrollView>
        <Modal visible={modalVisible} onRequestClose={handleModalClose}>
          <View style={styles.photoModalContainer}>
            {selectedImageIndex !== -1 && (
              <TouchableOpacity onPress={handleModalClose}>
                <Image source={{ uri: imageSources[selectedImageIndex].path }} style={styles.photoModal} />
              </TouchableOpacity>
            )}
          </View>
        </Modal>
      </View>

      <TouchableOpacity onPress={handleCreate} style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.button}>생성하기</Text>
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