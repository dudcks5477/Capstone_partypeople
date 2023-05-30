import React, { useState, useRef } from 'react';
import { StyleSheet, View, Dimensions,TouchableOpacity,Text } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useNavigation } from '@react-navigation/native';
import Geocoder from 'react-native-geocoding';
import {styles} from './Styles/MapStyles2'
Geocoder.init('AIzaSyB_eawVNI3T9lGyQsePWA2GwE2uXyWxZI0');


const MapScreen2 = () => {
  const mapRef = useRef(null);
  const navigation = useNavigation();
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [region, setRegion] = useState({
    latitude: 37.5665,
    longitude: 126.9780,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }); // 지도 초기 위치 상태 관리

  const handlePlaceSelected = (data, details) => {
    const { geometry } = details;
    const { location } = geometry;
    const { lat, lng } = location;
    
    // 검색한 위치로 지도 이동
    mapRef.current.animateToRegion({
      latitude: lat,
      longitude: lng,
      latitudeDelta: region.latitudeDelta,
      longitudeDelta: region.longitudeDelta,
    });
  };
  const handleMarkerPress = async (coordinate) => {
    try {
      setLongitude(coordinate.longitude)
      setLatitude(coordinate.latitude)
      const res = await Geocoder.from(coordinate.latitude, coordinate.longitude);
      
      setAddress(res.results[0].formatted_address)
      console.log(res.results[0].formatted_address);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <View style={styles.container}>
      <MapView
  provider={PROVIDER_GOOGLE}
  style={styles.map}
  ref={mapRef}
  initialRegion={region}
  onRegionChangeComplete={region => {
    setRegion(region);
    handleMarkerPress(region);
  }}
>
  <Marker coordinate={region} />
</MapView>

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
    onPress={() => navigation.navigate('AddScreen',{address,longitude,latitude})}
  >
    <Text style={styles.addButtonText}>위치 선택</Text>
  </TouchableOpacity>
  
  <View style={styles.addresscontainer}>
  <Text>{address}</Text>
</View>

    </View>
  );
};


export default MapScreen2;
