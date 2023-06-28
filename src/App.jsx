import React from "react";

import { AiOutlineFileDone } from "react-icons/ai";
import { BsFillPauseFill } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";

export const App = () => {
  return (
    <section className="h-screen bg-slate-500 flex justify-center items-center">
      <div className="w-1/2 bg-white h-4/6 gap-11 flex-col mx-auto rounded-md relative flex items-center p-10">
        <input
          placeholder="Create new task..."
          type="text"
          className="bg-gray-600 rounded-sm p-5 font-medium text-lg text-slate-200 outline-none border-none w-1/3 h-7"
        />
        <div className="w-full rounded-sm  bg-slate-600 h-16 flex items-center px-8 justify-between">
          <div className="text-slate-100 font-semibold text-lg">
            Washing deshes
          </div>
          <div className="flex gap-5">
            <button className="w-5 h-5 text-2xl text-green-500">
              <AiOutlineFileDone />
            </button>
            <button className="w-5 h-5 text-2xl text-yellow-300 ">
              <BsFillPauseFill />
            </button>
            <button className="w-5 h-5 text-2xl text-red-900">
              <AiFillDelete />
            </button>
          </div>
        </div>
        <button className="px-10 hover:bg-slate-400 hover:text-gray-900 font-semibold py-2 text-sm rounded-sm text-slate-400 absolute right-10 bottom-10 bg-slate-800 ">
          Create
        </button>
      </div>
    </section>
  );
};
