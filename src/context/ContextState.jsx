import React, { createContext, useContext, useEffect, useState } from "react";

const GState = createContext();

export const ContextState = ({ children }) => {
  const [mainList, setMainList] = useState([]);

  useEffect(() => {
    let local_data;
    localStorage.getItem("todo-data")
      ? (local_data = JSON.parse(localStorage.getItem("todo-data")).reverse())
      : [];
    local_data ? setMainList(local_data) : null;
  }, []);

  return (
    <GState.Provider value={{ mainList, setMainList }}>
      {children}
    </GState.Provider>
  );
};

export const useGState = () => {
  return useContext(GState);
};
