import { StyleSheet,Dimensions } from 'react-native';
export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#222',
    },
    heading: {
      color: '#ccc',
      fontSize: 40,
      fontWeight: 'bold',
      marginLeft: 15,
      marginTop: 30,
    },
    line: {
      marginTop: 20,
      width: '90%',
      marginHorizontal: '5%',
    },
    profileInfo: {
      marginTop: 5,
      width: '90%',
      marginHorizontal: '5%',
      flexDirection: 'row',
    },
    profileIcon: {
      marginRight: 2,
    },
    profileTextContainer: {
      flexDirection: 'column',
      justifyContent: 'center',
    },
    profileText: {
      fontSize: 14,
      color: '#ccc',
    },
    partyInfoContainer: {
      width: '90%',
      marginHorizontal: '5%',
    },
    partyInfoText: {
      marginTop: 5,
      marginBottom: 5,
      fontSize: 25,
      fontWeight: 'bold',
      height: 223,
      color: '#ccc',
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0)',
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalView: {
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
      shadowColor: '#000',
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
      marginTop: 10,
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
      backgroundColor: '#FFC107',
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      marginTop: 10,
    },
    navigateText: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    settingsContainer: {
      width: '90%',
      marginHorizontal: '5%',
    },
    settingsText: {
      marginTop: 5,
      marginBottom: 15,
      fontSize: 25,
      fontWeight: 'bold',
      color: '#ccc',
    },
    settingsItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    itemTextContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    itemIcon: {
      marginRight: 7,
    },
    itemText: {
      color: '#ccc',
      fontSize: 20,
    },
  });
  