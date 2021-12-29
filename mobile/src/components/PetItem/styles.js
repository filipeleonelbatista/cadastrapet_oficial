import { Dimensions, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
});