import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    width: '100%',
    height: 250,
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
    textAlignVertical: 'top',
    width: '100%',
    height: '100%',
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#FFF',
    borderRadius: 8,
    fontFamily: 'Poppins_400Regular',
  },
  inputDisabled:{
    textAlignVertical: 'top',
    width: '100%',
    height: '100%',
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#F3F5FF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#0000004D',
    fontFamily: 'Poppins_400Regular',
  },
});