import React from "react";

export const useDelete = (data, condition) => {
  if (condition) {
    data.length == 0
      ? localStorage.removeItem("delete-data")
      : localStorage.setItem("delete-data", JSON.stringify(data));
    return;
  }
  const old_data = JSON.parse(localStorage.getItem("delete-data"));
  old_data
    ? localStorage.setItem("delete-data", JSON.stringify([...old_data, data]))
    : localStorage.setItem("delete-data", JSON.stringify([data]));
};
