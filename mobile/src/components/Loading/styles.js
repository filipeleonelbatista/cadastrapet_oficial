import { Dimensions, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({  
  container: {
    marginTop: 24,
    flex: 1,
    backgroundColor: '#F3F5FF',
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    position: 'absolute',
    zIndex: 1000,
  },
});