import { Dimensions, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    flex: 1,
    backgroundColor: '#F3F5FF',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  scrollView: {
    marginVertical: 4,
    width: Dimensions.get('window').width,
    height: '100%',
  },
  content:{
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal:24,
    marginVertical: 16,
  },
  inputGroup:{
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal:24,
    marginVertical: 16,
  },
  petData:{
    flexDirection: 'column',
  },
  petAge:{
    fontWeight: 'normal',
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    color: '#566DEA',
    marginRight: 16,
  },
  title:{
    fontWeight: 'bold',
    fontFamily: 'Poppins_700Bold',
    fontSize: 24,
    color: '#566DEA',
    marginVertical: 2
  },
  petItem:{
    borderRadius: 8,
    backgroundColor:"#FFF",
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
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
    marginVertical: 14,
  },
  petActions:{
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent:'flex-end'
  },
  buttonNavGroup:{
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: '100%',
    paddingHorizontal:14,
  },
  buttonGroup:{
    flexDirection: 'column',
    alignItems: 'flex-end',
    width: '100%',
    paddingHorizontal:14,
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
  buttonRoundedWhite:{
    width: 96,
    height: 96,
    borderRadius: 96,
    backgroundColor: "#FFF",   
    alignItems:'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
});