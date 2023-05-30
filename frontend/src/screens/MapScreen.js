import React, { useState, useRef, useEffect, useCallback } from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity, Text, Modal } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { CancelToken, isCancel } from 'axios';
import { styles } from './Styles/MapStyles'
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



export default MapScreen;