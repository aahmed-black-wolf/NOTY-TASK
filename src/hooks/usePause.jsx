export const usePause = (data, condition) => {
  if (condition) {
    data.length == 0
      ? localStorage.removeItem("pause-data")
      : localStorage.setItem("pause-data", JSON.stringify(data));
    return;
  }
  const old_data = JSON.parse(localStorage.getItem("pause-data"));
  old_data
    ? localStorage.setItem("pause-data", JSON.stringify([...old_data, data]))
    : localStorage.setItem("pause-data", JSON.stringify([data]));
};
