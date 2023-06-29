import React from "react";

export const useComplete = (data, condition) => {
  const old_data = JSON.parse(localStorage.getItem("complete-data"));

  if (condition) {
    if (data.length < 1) {
      localStorage.removeItem("complete-data");
      return;
    }
    localStorage.setItem("complete-data", JSON.stringify(data));
    return;
  }

  old_data
    ? localStorage.setItem("complete-data", JSON.stringify([...old_data, data]))
    : localStorage.setItem("complete-data", JSON.stringify([data]));
};
