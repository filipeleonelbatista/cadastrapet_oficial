import React from "react";

import Routes from "./routes";

import "./styles/global.css";

import "dotenv/config";

import { AuthContextProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthContextProvider>
      <Routes />
    </AuthContextProvider>
  );
}

export default App;
