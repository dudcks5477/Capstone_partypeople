import React, {useState} from 'react';
import {View, Button, Image} from 'react-native';

const ImagePicker = require('react-native-image-picker');
const CameraScreen = () => {
  const [imageSource, setImageSource] = useState(null);

  const takePicture = () => {
    ImagePicker.launchCamera(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 1000,
        maxWidth: 1000,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          const source = {uri: response.uri};
          setImageSource(source);
        }
      },
    );
  };

  const chooseFromLibrary = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 1000,
        maxWidth: 1000,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          const source = {uri: response.uri};
          setImageSource(source);
        }
      },
    );
  };

  return (
    <View>
      <Button title="Take Picture" onPress={takePicture} />
      <Button title="Choose from Library" onPress={chooseFromLibrary} />
      {imageSource && <Image source={imageSource} style={{width: 300, height: 300}} />}
    </View>
  );
};

export default CameraScreen;
