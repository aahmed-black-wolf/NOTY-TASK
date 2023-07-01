import React from "react";
import { useGState } from "../context/ContextState";
import { AiOutlineRollback } from "react-icons/ai";
import { useAppender } from "../hooks/useAppender";
import { usePause } from "../hooks/usePause";
import { notify, timeFormater } from "../utils/GMethods";

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
        className="todo-box group p-5 sm:p-8 w-full group relative rounded-md  bg-slate-800 h-16 flex items-center  justify-between"
      >
        <div className="flex gap-3 sm:gap-5">
          <div className="text-cyan-500 font-semibold text-sm sm:text-lg">
            {e.title}
          </div>
          <div className="text-yellow-300">|</div>
          <div className="text-cyan-500 font-semibold text-sm sm:text-lg">
            {timeFormater(e.date)}
          </div>
          <div
            style={{
              transition: "all ease .3s",
              wordWrap: "break-word",
            }}
            className="absolute  h-max w-full z-10 group-hover:opacity-100 text-gray-900 font-medium text-sm sm:text-lg opacity-0 group-hover:scale-100 scale-0 top-0 left-[0px] rounded-md rounded-t-none  p-5 bg-white border-2  border-cyan-500"
          >
            {e.description}
          </div>
        </div>
        <div className="flex gap-3 sm:gap-5">
          <button
            onClick={() => reBack(e)}
            className="w-5 h-5 text-lg sm:text-2xl text-yellow-300 z-30"
          >
            <AiOutlineRollback />
          </button>
        </div>
      </div>
    ))
  );
};
