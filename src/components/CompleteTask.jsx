import React from "react";
import { AiOutlineFileDone } from "react-icons/ai";
import { BsFillPauseFill } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
export const CompleteTask = ({ data }) => {
  return (
    data &&
    data?.map((e) => (
      <div
        key={e.id}
        className="todo-box w-full rounded-md  bg-slate-800 h-16 flex items-center p-8 justify-between"
      >
        <div className="flex gap-5">
          <div className="text-cyan-500 font-semibold text-lg">{e.title}</div>
          <div className="text-cyan-500 font-semibold text-lg">{e.date}</div>
        </div>
        <div className="flex gap-5">
          <button className="w-5 h-5 text-2xl text-red-500">
            <AiFillDelete />
          </button>
        </div>
      </div>
    ))
  );
};
