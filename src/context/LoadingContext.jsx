import React, { createContext, useState } from "react";

export const LoadingContext = createContext({});

export function LoadingContextProvider(props) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        setIsLoading,
      }}
    >
      {props.children}
    </LoadingContext.Provider>
  );
}
