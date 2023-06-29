import React from "react";

export const useAppender = (data, condition) => {
  if (condition) {
    data.length == 0
      ? localStorage.removeItem("todo-data")
      : localStorage.setItem("todo-data", JSON.stringify(data));
    return;
  }
  const old_data = JSON.parse(localStorage.getItem("todo-data"));
  old_data
    ? localStorage.setItem("todo-data", JSON.stringify([...old_data, data]))
    : localStorage.setItem("todo-data", JSON.stringify([data]));
};
