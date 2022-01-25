import { Dimensions, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    flex: 1,
    backgroundColor: '#F3F5FF',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    position: 'relative',
  },
  content:{
    alignItems: 'center',
    width: '100%',
    paddingHorizontal:24,
    marginVertical: 8,
  },
  title:{
    fontWeight: 'bold',
    fontFamily: 'Poppins_700Bold',
    fontSize: 24,
    color: '#566DEA',
    marginVertical: 8,
  },
  buttonNavGroup:{
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: '100%',
    paddingHorizontal:14,
  },
  subtitle:{
    textAlign: 'center',
    fontWeight: 'normal',
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    color: '#566DEA',
    marginVertical: 8,
  },
  petItem:{
    borderRadius: 8,
    backgroundColor:"#FFF",
    alignItems: 'center',
    padding: 16,
    marginVertical: 8,
  },
  petImage:{ 
    width: 64,
    height: 64,
    borderRadius: 32,
    resizeMode: 'cover',
  },
  buttonRounded:{
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "transparent",   
    alignItems:'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
});