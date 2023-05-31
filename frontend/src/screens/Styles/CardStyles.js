import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
    cardContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: 16,
      overflow: 'hidden',
      elevation: 5,
      margin: 10,
      width: '90%',
      aspectRatio: 1.5,
    },
    image: {
      width: '100%',
      height: '60%',
    },
    title: {
      fontWeight: 'bold',
      fontSize: 16,
      marginHorizontal: 10,
      marginTop: 10,
    },
    description: {
      fontSize: 14,
      marginHorizontal: 10,
      marginVertical: 5,
    },
  });