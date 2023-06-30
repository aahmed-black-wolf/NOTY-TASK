import { toast } from "react-toastify";

const notify = (mess, type, dir = 3000) =>
  toast[type](mess, {
    position: "top-right",
    autoClose: dir,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

const SortDate = (data = [], condition = "up") => {
  const copy_data = [...data];
  const sorter = (a, b) => {
    const date_1 = new Date(a.date);
    const date_2 = new Date(b.date);

    if (condition == "down") {
      return date_1 - date_2;
    }
    return date_2 - date_1;
  };
  copy_data.sort(sorter);

  return copy_data;
};
export { SortDate, notify };
