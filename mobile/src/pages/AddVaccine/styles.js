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
    paddingHorizontal:24,
  },
  content:{
    alignItems: 'center',
    width: '100%'
  },
  title:{
    fontWeight: 'bold',
    fontSize: 24,
    color: '#566DEA',
    marginVertical: 8,
  },
  image:{
    textAlign: 'center',
    marginVertical: 32,
    width: 180,
    height: 30, 
    resizeMode: 'contain'
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
  actions:{
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
});