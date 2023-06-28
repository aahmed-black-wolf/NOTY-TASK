import React from "react";

export const useAppender = (data) => {
  const old_data = JSON.parse(localStorage.getItem("todo-data"));
  old_data
    ? localStorage.setItem("todo-data", JSON.stringify([...old_data, data]))
    : localStorage.setItem("todo-data", JSON.stringify([data]));
};
