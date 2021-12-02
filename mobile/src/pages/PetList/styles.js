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
  petGroup:{
    width: Dimensions.get('window').width,
    paddingHorizontal: 24,
    marginVertical: 24,
  },
  petItem:{
    borderRadius: 8,
    backgroundColor:"#FFF",
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    marginVertical: 8,
  },
  petImage:{ 
    width: 64,
    height: 64,
    borderRadius: 32,
    resizeMode: 'cover',
    marginRight: 8,
  },
  petName:{
    fontWeight: 'bold',
    fontFamily: 'Poppins_700Bold',
    fontSize: 20,
    color: '#566DEA',
    marginVertical: 28,
    marginRight: 16,
  },
  petActions:{
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent:'flex-end'
  },
  buttonRoundedWhite:{
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F2F4FF",   
    alignItems:'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  buttonRoundedRed:{    
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#EB4335",   
    alignItems:'center',
    justifyContent: 'center',
    marginRight: 8,
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