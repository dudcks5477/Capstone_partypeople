import React, { useState, useRef } from 'react';
import { StyleSheet, View, Dimensions,TouchableOpacity,Text,Modal,Pressable } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useNavigation } from '@react-navigation/native';



const MapScreen = ({route}) => {
  const { address,partyName,numOfPeople,description,latitude,longitude,date,time} = route.params || {}
  
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
  const handleMarkerPress = () => {
    setModalVisible(true);
  };
  const handlePartyDetailPress = () => {
    navigation.navigate('PartyDetail', {address, partyName, numOfPeople, description, date, time});
    setModalVisible(false);
    console.log(address, partyName, numOfPeople, description, date, time)
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
        {address && (
          
    <Marker
      coordinate={{
        latitude: latitude,
        longitude: longitude,
      }}
      onPress={handleMarkerPress} // 마커를 클릭했을 때, handleMarkerPress 함수를 실행합니다.
    />
  )}
  

      </MapView>
      <Modal
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => {
    Alert.alert('Modal has been closed.');
    setModalVisible(false);
  }}>
  <Pressable
    style={styles.centeredView}
    onPress={() => handlePartyDetailPress()
    }>
    <View style={styles.modalView}>
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
    </View>
  </Pressable>
</Modal>
      {/* GooglePlacesAutocomplete를 추가합니다. */}
      <GooglePlacesAutocomplete
              minLength={2}
              placeholder="언제든 파티 위치 검색"
              query={{
                key: '영찬아 여기에 API넣어서 써 직접 내가 .env 로 할려다가 실패해서 컴퓨터 부실뻔했어 근데 안돼 아직도',
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
    marginTop: 50,
  },
  
  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 60,
    width: '90%',
  },
  
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default MapScreen;
