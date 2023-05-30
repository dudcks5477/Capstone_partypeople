import { StyleSheet, Dimensions } from 'react-native';
export const styles = StyleSheet.create({
    search: {
      // container 감싸고 있는 컴포넌트
      container: {
        alignItems: 'center',
        opacity: 0.8,
        marginTop: 20,
      },
      // input을 감싸는 컴포넌트
      textInputContainer: {
        borderRadius : 20,
        flexDirection: "row",
        width: "90%",
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
      marginBottom: 40,
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
      bottom : 60,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0)',
    },
    modalView: {
      backgroundColor: '#222',
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
      color: 'white'
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