import { StyleSheet } from 'react-native';

const buttonBase = {
    paddingHorizontal: 28,
    paddingVertical: 14,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',  
    borderRadius: 8,
}

const buttonFontBase = {
  fontWeight: 'bold',
  fontSize: 14,
  fontFamily: 'Poppins_700Bold',
}

export const styles = StyleSheet.create({
  button: {    
    ...buttonBase,
    backgroundColor: '#566DEA',
    borderColor: '#566DEA',
    borderWidth: 2,
  },
  
  buttonTransparent:{    
    ...buttonBase,
    backgroundColor: '#FFF',
    borderColor: '#566DEA',
    borderWidth: 2,
   },
   textButtonTransparent:{
    ...buttonFontBase,
    color: '#566DEA',
   },
   textButton:{
    ...buttonFontBase,
    color: '#FFF',
   },
   buttonNavActive:{     
    paddingHorizontal: 14,
    paddingVertical: 8,
    margin: 4,
    alignItems: 'center',
    justifyContent: 'center',  
    borderBottomWidth:3,
    borderColor: '#6CA6FD',
   },
   buttonNav:{     
    paddingHorizontal: 14,
    paddingVertical: 8,
    margin: 4,
    alignItems: 'center',
    justifyContent: 'center',  
   },
   buttonNavTextActive:{     
    fontWeight: 'bold',
    fontSize: 14,
    color: '#566DEA',
    fontFamily: 'Poppins_700Bold',
   },
   buttonNavText:{     
    fontWeight: 'normal',
    fontSize: 14,
    color: '#566DEA4D',
    fontFamily: 'Poppins_400Regular',
   },
});