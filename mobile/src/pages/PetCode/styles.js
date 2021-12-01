import { Dimensions, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    flex: 1,
    backgroundColor: '#F3F5FF',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  content:{
    alignItems: 'center',
    width: '100%',
    paddingHorizontal:24,
    marginVertical: 16,
  },
  title:{
    fontWeight: 'bold',
    fontSize: 24,
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
    marginRight: 8,
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