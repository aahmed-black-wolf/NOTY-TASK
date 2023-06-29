import React, { createContext, useContext, useEffect, useState } from "react";

const GState = createContext();

export const ContextState = ({ children }) => {
  const [mainList, setMainList] = useState([]);
  const [completeList, setCompleteList] = useState([]);
  const [deleteList, setDeleteList] = useState([]);

  const setData = (condition) => {
    let local_data;
    localStorage.getItem(condition)
      ? (local_data = JSON.parse(localStorage.getItem(condition)).reverse())
      : [];

    return local_data;
  };

  useEffect(() => {
    let todo_data = setData("todo-data");
    let complete_task_data = setData("complete-data");
    let delete_task_data = setData("delete-data");

    todo_data ? setMainList(todo_data) : null;
    complete_task_data ? setCompleteList(complete_task_data) : null;
    delete_task_data ? setDeleteList(delete_task_data) : null;
  }, []);

  return (
    <GState.Provider
      value={{
        mainList,
        setMainList,
        setCompleteList,
        completeList,
        deleteList,
        setDeleteList,
      }}
    >
      {children}
    </GState.Provider>
  );
};

export const useGState = () => {
  return useContext(GState);
};
