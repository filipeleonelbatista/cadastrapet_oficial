import React from "react";
import Routes from "./routes";
import './styles/global.css';

import { AuthContextProvider } from "./context/AuthContext";
import { ResizeContextProvider } from "./context/ResizeContext";
import { LoadingContextProvider } from "./context/LoadingContext";
import { ToastContextProvider } from "./context/ToastContext";

function App() {
  return (
    <ToastContextProvider>
      <LoadingContextProvider>
        <ResizeContextProvider>
          <AuthContextProvider>
            <Routes />
          </AuthContextProvider>
        </ResizeContextProvider>
      </LoadingContextProvider>
    </ToastContextProvider>
  );
}

export default App;
