import React, { createContext, useContext, useEffect, useState } from "react";
import { SortDate } from "../utils/GMethods";

const GState = createContext();

export const ContextState = ({ children }) => {
  const [mainList, setMainList] = useState([]);
  const [completeList, setCompleteList] = useState([]);
  const [deleteList, setDeleteList] = useState([]);
  const [pauseList, setPauseList] = useState([]);

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
    let pause_task_data = setData("pause-data");

    todo_data ? setMainList(todo_data) : null;
    complete_task_data ? setCompleteList(complete_task_data) : null;
    delete_task_data ? setDeleteList(delete_task_data) : null;
    pause_task_data ? setPauseList(pause_task_data) : null;

    setMainList(SortDate(todo_data));
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
        pauseList,
        setPauseList,
      }}
    >
      {children}
    </GState.Provider>
  );
};

export const useGState = () => {
  return useContext(GState);
};
