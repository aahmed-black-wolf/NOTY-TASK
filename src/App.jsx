import React, { useRef, useState } from "react";

import { AiOutlineFileDone } from "react-icons/ai";
import { BsFillPauseFill } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import { FcDeleteDatabase } from "react-icons/fc";
import { useGState } from "./context/ContextState";
import { useAppender } from "./hooks/useAppender";

export const App = () => {
  const [id, setId] = useState(new Date().getTime());
  const input_data = useRef();
  const input_date = useRef();
  const { mainList, setMainList } = useGState();

  const appendTask = () => {
    setId(new Date().getTime());
    if (input_data.current.value != "" && input_date.current.value != "") {
      setMainList((prop) => [
        { id, title: input_data.current.value, date: input_date.current.value },
        ...prop,
      ]);
      useAppender({
        id,
        title: input_data.current.value,
        date: input_date.current.value,
      });
      setTimeout(() => {
        input_data.current.value = "";
        input_date.current.value = "";
      }, 0);
    }
  };
  return (
    <section className="h-screen bg-slate-500 flex justify-center items-center">
      <div className="w-1/2   bg-white h-4/6 gap-11 flex-col mx-auto rounded-md relative flex items-center p-10">
        <div className="w-full px-5 flex justify-between items-center">
          <div className="flex gap-4 items-center w-full ">
            <input
              placeholder="Create new task..."
              type="text"
              ref={input_data}
              onKeyDown={({ code }) => (code == "Enter" ? appendTask() : null)}
              className="bg-slate-400 rounded-sm p-5 font-medium text-lg text-slate-700 placeholder:text-slate-500 outline-none border-none w-1/3 h-7"
            />
            <input
              ref={input_date}
              type="date"
              className="bg-slate-400 px-5 py-2 rounded-sm text-slate-700 font-bold"
            />
          </div>
          <button
            className="text-3xl"
            onClick={() => {
              setMainList([]);
              localStorage.clear();
            }}
          >
            <FcDeleteDatabase />
          </button>
        </div>

        <div className="h-96 w-full p-4 flex flex-col gap-5 overflow-auto">
          <div className="flex px-3 w-full justify-between">
            <div className="flex justify-between w-1/6">
              <h2 className="text-lg font-bold">Name</h2>
              <h2 className="text-lg font-bold">|</h2>
              <h2 className="text-lg font-bold">Date</h2>
            </div>
          </div>
          {mainList &&
            mainList.map((e) => (
              <div
                key={e.id}
                className="w-full rounded-md  bg-slate-800 h-16 flex items-center p-8 justify-between"
              >
                <div className="flex gap-5">
                  <div className="text-cyan-500 font-semibold text-lg">
                    {e.title}
                  </div>
                  <div className="text-cyan-500 font-semibold text-lg">
                    {e.date}
                  </div>
                </div>
                <div className="flex gap-5">
                  <button className="w-5 h-5 text-2xl text-green-500">
                    <AiOutlineFileDone />
                  </button>
                  <button className="w-5 h-5 text-2xl text-yellow-300 ">
                    <BsFillPauseFill />
                  </button>
                  <button className="w-5 h-5 text-2xl text-red-500">
                    <AiFillDelete />
                  </button>
                </div>
              </div>
            ))}
        </div>
        <button
          onClick={appendTask}
          className="px-10 hover:bg-slate-400 hover:text-gray-900 font-semibold py-2 text-sm rounded-sm text-slate-400 absolute right-10 bottom-10 bg-slate-800 "
        >
          Create
        </button>
      </div>
    </section>
  );
};
