import React from "react";

export const useComplete = (data) => {
  const old_data = JSON.parse(localStorage.getItem("complete-data"));
  old_data
    ? localStorage.setItem("complete-data", JSON.stringify([...old_data, data]))
    : localStorage.setItem("complete-data", JSON.stringify([data]));
};
