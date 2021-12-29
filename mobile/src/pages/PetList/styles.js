import { Dimensions, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    flex: 1,
    backgroundColor: '#F3F5FF',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    position: 'relative',
  },
  image:{
    marginVertical: 32,
    width: 180,
    height: 30, 
    resizeMode: 'contain'
  },
  title:{
    fontWeight: 'bold',
    fontFamily: 'Poppins_700Bold',
    fontSize: 24,
    color: '#566DEA',
    marginVertical: 28,
  },
  scrollView: {
    marginVertical: 4,
    width: Dimensions.get('window').width,
    paddingHorizontal:24,
  },
  addPetButton:{
    width: '100%',
    borderRadius: 8,
    backgroundColor:"transparent",
    flexDirection: 'row',      
    alignItems:'center',
    justifyContent: 'center',
    padding: 32,
    marginVertical: 16,
  },
  addPetButtonText:{
    fontWeight: 'normal',
    fontSize: 18,
    color: '#566DEA',
    fontFamily: 'Poppins_400Regular',
  },
});