import React from "react";
import { AiOutlineRollback } from "react-icons/ai";
import { useGState } from "../context/ContextState";
import { useAppender } from "../hooks/useAppender";
import { useDelete } from "../hooks/useDelete";

export const Delete = () => {
  const { mainList, setMainList, deleteList, setDeleteList } = useGState();

  const reBack = (data) => {
    useAppender([data, ...mainList], true);
    setMainList([data, ...mainList]);

    useDelete(
      deleteList.filter((e) => e != data),
      true
    );
    setDeleteList([...deleteList.filter((e) => e != data)]);
  };
  return (
    deleteList &&
    deleteList?.map((e) => (
      <div
        key={e.id}
        className="todo-box w-full rounded-md  bg-slate-800 h-16 flex items-center p-8 justify-between"
      >
        <div className="flex gap-5">
          <div className="text-cyan-500 font-semibold text-lg">{e.title}</div>
          <div className="text-cyan-500 font-semibold text-lg">{e.date}</div>
        </div>
        <div className="flex gap-5">
          <button
            data-id="recover-button"
            onClick={() => reBack(e)}
            className="w-5 h-5 text-2xl text-red-500"
          >
            <AiOutlineRollback />
          </button>
        </div>
      </div>
    ))
  );
};
