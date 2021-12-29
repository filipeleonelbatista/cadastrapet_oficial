import { Dimensions, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F5FF',
    flexDirection:'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  image:{
    width: 230,
    height: 50, 
    resizeMode: 'contain'
  },
  subtitle:{
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    color: '#6CA6FD',
    marginVertical: 14,
    marginBottom: 48,
  },
  buttonGroup:{
    width: Dimensions.get('window').width,
    paddingHorizontal: 14,
    bottom: 0,
    marginBottom: 58,
  }
});