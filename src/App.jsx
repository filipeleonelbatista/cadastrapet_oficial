import React from "react";
import Routes from "./routes";
import './styles/global.css';

import { AuthContextProvider } from "./context/AuthContext";
import { ResizeContextProvider } from "./context/ResizeContext";
import { LoadingContextProvider } from "./context/LoadingContext";
import { ToastContextProvider } from "./context/ToastContext";
import { DarkModeContextProvider } from "./context/DarkModeContext";

function App() {
  return (
    <ToastContextProvider>
      <LoadingContextProvider>
        <ResizeContextProvider>
          <AuthContextProvider>
            <DarkModeContextProvider>
              <Routes />
            </DarkModeContextProvider>
          </AuthContextProvider>
        </ResizeContextProvider>
      </LoadingContextProvider>
    </ToastContextProvider>
  );
}

export default App;
