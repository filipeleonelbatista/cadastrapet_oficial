import { StyleSheet } from 'react-native';

const buttonBase = {
    borderRadius: 24,
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
   }
});