import React, { createContext, useEffect, useState } from "react";
import { useMediaQuery } from '@mui/material';

export const DarkModeContext = createContext({});

export function DarkModeContextProvider(props) {

  const [mode, setMode] = useState('light');

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  useEffect(() => {

    if (localStorage.getItem("@dark-theme") !== null) {
      const selectedTheme = localStorage.getItem("@dark-theme")
      setMode(selectedTheme)
    } else {
      localStorage.setItem("@dark-theme", prefersDarkMode ? 'dark' : 'light')
      setMode(prefersDarkMode ? 'dark' : 'light')
    }

  }, [])
  return (
    <DarkModeContext.Provider
      value={{
        mode
      }}
    >
      {props.children}
    </DarkModeContext.Provider>
  );
}
