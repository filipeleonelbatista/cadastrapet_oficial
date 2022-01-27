import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    width: '100%',
  },
  inputGroup: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputDate:{
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    fontFamily: 'Poppins_400Regular',
    borderRightWidth:0,
  },
  inputDisabledDate:{  
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#F3F5FF',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderWidth: 1,
    borderColor: '#0000004D',
    fontFamily: 'Poppins_400Regular',
    borderRightWidth:0,
  },
  ButtonDate:{        
    paddingHorizontal: 14,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',  
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: '#566DEA',
    borderColor: '#566DEA',
    borderWidth: 2,
  },
  ButtonDisabledDate:{
    paddingHorizontal: 14,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',  
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: '#566DEA',
    borderColor: '#566DEA',
    borderWidth: 2,
  },
  label:{    
    fontWeight: 'normal',
    fontSize: 14,
    color: '#566DEA',
    marginBottom: 8,
    fontFamily: 'Poppins_400Regular',
  },
  error:{
    fontWeight: 'bold',
    fontSize: 14,
    color: '#EB4335',
    marginVertical: 4,
    fontFamily: 'Poppins_700Bold',
  },
  input:{
    width: '100%',
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#FFF',
    borderRadius: 8,
    fontFamily: 'Poppins_400Regular',
  },
  inputDisabled:{
    width: '100%',
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#F3F5FF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#0000004D',
    fontFamily: 'Poppins_400Regular',
  },
});