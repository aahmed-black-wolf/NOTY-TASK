import React from "react";
import { useGState } from "../context/ContextState";
import { AiOutlineRollback } from "react-icons/ai";
import { useAppender } from "../hooks/useAppender";
import { usePause } from "../hooks/usePause";
import { notify } from "../utils/GMethods";

export const Pause = () => {
  const { pauseList, setMainList, mainList, setPauseList } = useGState();
  const reBack = (data) => {
    useAppender([data, ...mainList], true);
    setMainList([data, ...mainList]);

    usePause(
      pauseList.filter((e) => e != data),
      true
    );
    setPauseList([...pauseList.filter((e) => e != data)]);
    notify("Task recovered successfully", "info");
  };
  return (
    pauseList &&
    pauseList?.map((e) => (
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
            onClick={() => reBack(e)}
            className="w-5 h-5 text-2xl text-yellow-300"
          >
            <AiOutlineRollback />
          </button>
        </div>
      </div>
    ))
  );
};
