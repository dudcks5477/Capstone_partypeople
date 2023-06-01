import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
    search: {
      container: {
        alignItems: 'center',
        opacity: 0.8,
        marginTop: 20,
      },
      textInputContainer: { 
        borderRadius : 20,
        flexDirection: "row",
        width: "90%", 
      }
    },
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
      position: 'absolute',
      bottom: 20,
      right: 20,
      width: 150,
      height: 50,
      backgroundColor: '#ffffff',
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
    },
    addButtonText: {
      fontSize: 20,
      color: 'black',
    },
    addresscontainer:{ 
      borderWidth: 1,
      backgroundColor: '#ffffff',
      borderColor: '#ffffff', 
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center', 
      width: 200,
      height: 60,
      position: 'absolute', 
      bottom: 20, 
      left: 10 
      },
  });