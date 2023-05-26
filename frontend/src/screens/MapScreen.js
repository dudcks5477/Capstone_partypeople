import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity, Text, Modal, Pressable } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';


const MapScreen = () => {
  const [parties, setParties] = useState([]);
  const [partyID, setPartyID] = useState(null);
  const [imageFile, setImageFile] = useState('');
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState(37.5665);
  const [longitude, setLongitude] = useState(126.9780);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState();
  const [partyName, setPartyName] = useState('');
  const [numOfPeople, setNumOfPeople] = useState('');
  const [description, setDescription] = useState('');
  const mapRef = useRef(null); // Ref를 추가합니다.
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [region, setRegion] = useState({
    latitude: 37.5665,
    longitude: 126.9780,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }); // 지도 초기 위치를 상태로 관리합니다.
  const handlePlaceSelected = (data, details) => {
    const { geometry } = details;
    const { location } = geometry;
    const { lat, lng } = location;

    // 검색한 위치로 지도를 이동시킵니다.
    mapRef.current.animateToRegion({
      latitude: lat,
      longitude: lng,
      latitudeDelta: region.latitudeDelta,
      longitudeDelta: region.longitudeDelta,
    });
  };
  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get('http://3.35.21.149:8080/party');
      const data = response.data;

      // 받아온 파티 데이터를 배열로 상태에 저장합니다.
      setParties(data);

      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  fetchData();
}, []);
const handleMarkerPress = (party) => {
  // 선택된 파티의 데이터를 상태에 저장합니다.
  setAddress(party.partyLocation);
  setLatitude(party.latitude);
  setLongitude(party.longitude);
  setDescription(party.content);
  setDate(party.partyDate);
  setTime(party.PartyTime);
  setNumOfPeople(party.numOfPeople);
  setPartyName(party.partyName);
  if (party.partyID) {
    setPartyID(party.partyID);
  }
  if (party.imageFile && party.imageFile.length > 0) {
    setImageFile(party.imageFile[0]);
  }

  // Modal을 표시합니다.
  setModalVisible(true);
};

  const handlePartyDetailPress = () => {
    navigation.navigate('PartyDetail',partyID);
    setModalVisible(false);
    console.log("Map1",address, partyName, numOfPeople, description, date, time)
  }
  
  return (
    <View style={styles.container}>
      <MapView
  provider={PROVIDER_GOOGLE}
  style={styles.map}
  ref={mapRef} // Ref를 추가합니다.
  initialRegion={region} // 초기 위치를 상태에서 가져옵니다.
  onRegionChangeComplete={setRegion} // 지도를 이동할 때마다 상태를 업데이트합니다.
>
  {parties.map((party, index) => (
    <Marker
      key={index}
      coordinate={{
        latitude: party.latitude,
        longitude: party.longitude,
      }}
      onPress={() => handleMarkerPress(party)} // 클릭한 마커에 해당하는 파티의 데이터를 인자로 넘깁니다.
    />
  ))}
</MapView>

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.centeredView}>
            <View style={[styles.modalView, {marginTop: 'auto'}]}>
              <Text style={styles.modalText}>
                파티이름 :{partyName} {'\n'}
                날짜 :{date}{'\n'}
                시간 :{time}{'\n'}
                인원 :{numOfPeople}{'\n'}
                설명 :{description}
              </Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.textStyle}>닫기</Text>
              </Pressable>
              <TouchableOpacity
                style={styles.navigateButton}
                onPress={() => {
                  handlePartyDetailPress;
              }}>
                <Text style={styles.navigateText}>Navigate</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
      {/* GooglePlacesAutocomplete를 추가합니다. */}
      <GooglePlacesAutocomplete
              minLength={2}
              placeholder="언제든 파티 위치 검색"
              query={{
                key: '',
                language: "ko",
                components: "country:kr",
              }}
              keyboardShouldPersistTaps={"handled"}
              fetchDetails={true}
              onPress={handlePlaceSelected}
              onFail={(error) => console.log(error)}
              onNotFound={() => console.log("no results")}
              keepResultsAfterBlur={true}
              enablePoweredByContainer={false}
              styles={styles.search}
            />
            <TouchableOpacity
    style={styles.addButton}
    onPress={() => navigation.navigate('AddScreen')}
  >
    <Text style={styles.addButtonText}>+생성하기</Text>
  </TouchableOpacity>
  
    </View>
    
      
    
  );
};

const styles = StyleSheet.create({
  search: {
    // container 감싸고 있는 컴포넌트
      container: {
        alignItems: 'center',
        opacity: 0.8, // 투명도 설정
        marginTop: 20,},
    // input을 감싸는 컴포넌트
      textInputContainer: {
        
        borderRadius : 20,
        flexDirection: "row",
        width: "90%", // 여기서 width를 수정합니다.
  }},
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  textInputContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  textInput: {
    height: 38,
    color: '#5d5d5d',
    fontSize: 16,
    borderRadius: 0,
    borderBottomWidth: 1,
    borderColor: '#cccccc',
  },
  listView: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#cccccc',
    borderTopWidth: 0,
  },
  addButton: {
    opacity : 0.8,
    position: 'absolute',
    bottom: 500,
    right: 20,
    width: 100,
    height: 30,
    backgroundColor: '#cccccc',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 10,
    color: 'white',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    bottom : 60
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: Dimensions.get('window').width - 60,
    height: Dimensions.get('window').height / 4,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginVertical: 10,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  navigateButton: {
    backgroundColor: 'transparent',
    width: Dimensions.get('window').width - 60,
    height: Dimensions.get('window').height / 4,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    bottom: 205,
    
  },
});

export default MapScreen;