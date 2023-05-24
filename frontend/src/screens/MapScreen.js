import React, { useState, useRef,useEffect } from 'react';
import { StyleSheet, View, Dimensions,TouchableOpacity,Text,Modal,Pressable } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useNavigation } from '@react-navigation/native';



const MapScreen = () => {
  
  const mapRef = useRef(null);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [parties, setParties] = useState([]);
  const [selectedParty, setSelectedParty] = useState(null);
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
    const getData = async () => {
      try {
        const response = await fetch('http://ec2-13-209-74-82.ap-northeast-2.compute.amazonaws.com:8080/party');
        
        if (response.status === 200) {
          const data = await response.json();
          setParties(data);
        } else {
          console.log('Data fetching failed');
        }
      } catch (e) {
        console.log(e);
      }
    };
  
    getData();
  }, []);
  const handleMarkerPress = (party) => {
    setSelectedParty(party);
    setModalVisible(true);
  };
  const handlePartyDetailPress = () => {
    // Here, pass party ID to the next screen
    navigation.navigate('PartyDetail', { partyId: selectedParty.partyId });
    setModalVisible(false);
  };
  
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        ref={mapRef}
        initialRegion={region}
        onRegionChangeComplete={setRegion}
      >
        {parties.map((party) => (
          <Marker
            key={party.partyId}
            coordinate={{
              latitude: party.latitude,
              longitude: party.longitude,
            }}
            onPress={() => handleMarkerPress(party)}
          />
        ))}
      </MapView>
      {selectedParty && (
        <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            onPress={() => setModalVisible(false)}
          >
            <View style={styles.centeredView}>
              <View style={[styles.modalView, { marginTop: 'auto' }]}>
                <Text style={styles.modalText}>
                  파티이름 : {selectedParty.partyName} {'\n'}
                  날짜 : {selectedParty.date} {'\n'}
                  시간 : {selectedParty.time} {'\n'}
                  인원 : {selectedParty.numOfPeople} {'\n'}
                  설명 : {selectedParty.description}
                </Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.textStyle}>닫기</Text>
                </Pressable>
                <TouchableOpacity
                  style={styles.navigateButton}
                  onPress={handlePartyDetailPress}
                >
                  <Text style={styles.navigateText}>Navigate</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      )}
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
