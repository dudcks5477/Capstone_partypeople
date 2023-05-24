import React, {useState} from 'react';
import {View, Button, Platform, Text, TextInput,TouchableOpacity, Alert, ScrollView, Image,Modal} from 'react-native';

// import CameraScreen from './CameraScreen';
import ImageCropPicker from 'react-native-image-crop-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';

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
  const [numOfPeople, setNumOfPeople] = useState('');
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
    if (!address || !partyName || !numOfPeople || !description || !date || imageSources.length === 0) {
      Alert.alert('오류', '입력되지 않은 항목이 있습니다.');
    } else {
      try {
        const formData = new FormData();
  
        // 이미지 업로드
        imageSources.forEach((image, index) => {
          const filename = `image_${index + 1}.jpg`;
          formData.append('images', {
            uri: image.path,
            type: image.mime,
            name: filename,
          });
        });
  
        // 기존의 데이터 추가
        formData.append('address', address);
        formData.append('longitude', longitude);
        formData.append('latitude', latitude);
        formData.append('date2', date2);
        formData.append('time', time);
        formData.append('partyName', partyName);
        formData.append('numOfPeople', numOfPeople);
        formData.append('description', description);
        // console.log(formData._parts)
        const response = await axios.post('/api/party', formData);
  
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

  
  const handleGoBack = () => {
    navigation.goBack(); // 이전으로 돌아가기
  }

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
         <View>
         <Text>사진 등록</Text>
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
          <MaterialIcons name="photo-camera" size={70} color="gray" />
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
          backgroundColor: '#ccc',
          width: 147,
          height: 43,
          lineHeight: 43,
          textAlign: 'center',
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
