import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

const MapScreen = () => {
  const [position, setPosition] = useState(null);

  const handleLongPress = ({nativeEvent}) => {
    const {coordinate} = nativeEvent;
    setPosition(coordinate);
  };

  const handlePress = () => {
    // Create and save location using position state
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsUserLocation={true}
        onLongPress={handleLongPress}>
        {position && <Marker coordinate={position} />}
      </MapView>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Image source={require('../assets/seoul.jpeg')} style={styles.image} />
        <Text style={styles.text}>생성하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  button: {
    position: 'absolute',
    bottom: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 2,
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MapScreen;
