import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222',
    paddingHorizontal: 20,
  },
  loginText: {
    color:"#fff", 
    position: 'absolute', 
    top: 92, 
    alignSelf: 'center', 
    fontSize: 32, 
    fontWeight: 'bold'
  },
  inputContainer: {
    marginBottom: 60 
  },
  input: {
    height: 50,
    width: 333,
    borderColor: 'gray',
    backgroundColor: '#D2D2D2',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  button: {
    width: 333,
    backgroundColor: '#000',
    padding: 'auto',
    marginBottom: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});