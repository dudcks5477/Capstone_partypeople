import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#222',
    },
    colW: {
      color: 'white',
    },
    backButton: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '90%',
      marginHorizontal: '5%',
      marginTop: 2,
    },
    cardContainer: {
      alignItems: 'center',
      marginTop: 10,
    },
    cardImage: {
      width: '90%',
      height: 222,
      borderRadius: 8,
      shadowColor: '#000000',
      shadowOpacity: 0.1,
      shadowOffset: {width: 0, height: 2},
      shadowRadius: 6,
    },
    hostProfile: {
      width: '90%',
      marginHorizontal: '5%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      margin: 10,
    },
    profileTextContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    partyInfoContainer: {
      width: '90%',
      marginHorizontal: '5%',
      height: 177,
    },
    attendeesContainer: {
      flexDirection: 'row',
      width: '90%',
      marginHorizontal: '5%',
      marginTop: 5,
    },
    attendeeButton: {
      marginRight: 10,
    },
    attendee: {
      alignItems: 'center',
    },
    buttonContainer: {
      margin: 45,
      width: '90%',
      marginHorizontal: '5%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    cartContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: 30,
    },
    cartText: {
      marginLeft: 5,
      color: 'white',
      fontWeight: 'bold',
    },
  });