import React from 'react';
import { StyleSheet, View } from 'react-native';

const Line = ({style}) => {
  return <View style={[styles.line, style]} />;
};

const styles = StyleSheet.create({
  line: {
    borderWidth: 1,
    borderColor: '#D2D2D2',
    height: 1,
    width: '90%',
    marginHorizontal: '5%',
  },
});

export default Line;
