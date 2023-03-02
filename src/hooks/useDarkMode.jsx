import { useContext } from 'react';
import { DarkModeContext } from '../context/DarkModeContext';

export function useDarkMode() {
  const value = useContext(DarkModeContext)
  return value;
}