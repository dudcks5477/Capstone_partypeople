import React, { useState, useRef, useEffect, useCallback } from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity, Text, Modal } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { CancelToken, isCancel } from 'axios';

const MapScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [parties, setParties] = useState([]);
  const [selectedParty, setSelectedParty] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const mapRef = useRef(null);

  const [region, setRegion] = useState({
    latitude: 37.5665,
    longitude: 126.9780,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    const source = CancelToken.source();

    const fetchData = async () => {
      try {
        const response = await axios.get('http://3.35.21.149:8080/party', {
          cancelToken: source.token,
        });
        const data = response.data;
        setParties(data);
      } catch (e) {
        if (isCancel(e)) {
          console.log('Request canceled', e.message);
        } else {
          console.log(e);
        }
      }
    };

    fetchData();

    return () => {
      source.cancel();
    };
  }, [isFocused]);

  const handleMarkerPress = useCallback((party) => {
    setSelectedParty(party);
    setModalVisible(true);
  }, []);

  const handlePartyDetailPress = useCallback(() => {
    console.log("select",selectedParty.id)
    navigation.navigate('PartyDetail', selectedParty.id);
    setModalVisible(false);
  }, [navigation, selectedParty]);

  const handlePlaceSelected = useCallback((data, details) => {
    const { geometry } = details;
    const { location } = geometry;
    const { lat, lng } = location;

    mapRef.current.animateToRegion({
      latitude: lat,
      longitude: lng,
      latitudeDelta: region.latitudeDelta,
      longitudeDelta: region.longitudeDelta,
    });
  }, [region]);

  const renderPartyMarkers = useCallback(() => (
    parties.map((party, index) => (
      <Marker
        key={index}
        coordinate={{
          latitude: party.latitude,
          longitude: party.longitude,
        }}
        onPress={() => handleMarkerPress(party)}
      />
    ))
  ), [parties, handleMarkerPress]);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        ref={mapRef}
        initialRegion={region}
        onRegionChangeComplete={setRegion}
      >
        {renderPartyMarkers()}
      </MapView>

      <PartyModal
        isVisible={modalVisible}
        party={selectedParty}
        onDetailPress={handlePartyDetailPress}
        onClose={() => setModalVisible(false)}
      />

      <GooglePlacesAutocomplete
        minLength={2}
        placeholder="Search"
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
        <Text style={styles.addButtonText}>+ Add</Text>
      </TouchableOpacity>
    </View>
  );
};

// 이 부분은 모달 컴포넌트를 생성하여 분리하였습니다.
const PartyModal = ({ isVisible, party, onDetailPress, onClose }) => (
  <Modal
    transparent={true}
    visible={isVisible}
    onRequestClose={onClose}
  >
    <TouchableOpacity
      style={styles.modalOverlay}
      onPress={onClose}
    >
      <View style={styles.centeredView}>
        <View style={[styles.modalView, { marginTop: 'auto' }]}>
          <Text style={styles.modalText}>
            {`Party Name: ${party?.partyName}\n`}
            {`DateTime: ${party?.partyDateTime}\n`}
            {`People: ${party?.numOfPeople}\n`}
            {`Description: ${party?.content}`}
          </Text>
          <TouchableOpacity
            style={styles.navigateButton}
            onPress={onDetailPress}
          >
            <Text style={styles.navigateText}>Navigate</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  </Modal>
);

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
    bottom: 145,

  },
});

export default MapScreen;