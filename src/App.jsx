import React, { useEffect, useRef, useState } from "react";
import { AiOutlineFileDone } from "react-icons/ai";
import { BsFillPauseFill } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";

import { FcDeleteDatabase } from "react-icons/fc";
import { MdArrowRight } from "react-icons/md";
import {
  PiArrowBendLeftDownDuotone,
  PiArrowBendLeftUpDuotone,
} from "react-icons/pi";
import { MdOutlineClose } from "react-icons/md";
import { useAppender } from "./hooks/useAppender";
import { useGState } from "./context/ContextState";
import { useComplete } from "./hooks/useComplete";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useDelete } from "./hooks/useDelete";
import { usePause } from "./hooks/usePause";
import { SortDate, handelDate, notify, timeFormater } from "./utils/GMethods";

export const App = () => {
  const [id, setId] = useState(new Date().getTime());
  const [formStatus, setFormStatus] = useState(false);
  const input_data = useRef();
  const input_date = useRef();
  const input_description = useRef();
  const baseUrl = useLocation();

  const {
    mainList,
    setMainList,
    setCompleteList,
    setDeleteList,
    completeList,
    deleteList,
    pauseList,
    setPauseList,
  } = useGState();

  const appendTask = () => {
    setId(new Date().getTime());
    if (
      input_data.current.value != "" &&
      input_date.current.value != "" &&
      input_description.current.value != ""
    ) {
      setMainList((prop) =>
        SortDate([
          {
            id,
            title: input_data.current.value,
            date: input_date.current.value,
            description: input_description.current.value,
          },
          ...prop,
        ])
      );
      useAppender(
        {
          id,
          title: input_data.current.value,
          date: input_date.current.value,
          description: input_description.current.value,
        },
        false
      );
      setTimeout(() => {
        input_data.current.value = "";
        input_date.current.value = "";
        input_description.current.value = "";
      }, 0);
      notify("Task Appended Successfully", "success", 2000);
      return;
    }
    notify(`Please Enter valid Data`, "warn");
  };

  const restMainList = (data) => {
    useAppender(
      mainList.filter((e) => e != data),
      true
    );
    setMainList([...mainList.filter((e) => e != data)]);
  };

  const completeTask = (data) => {
    restMainList(data);
    setCompleteList((prop) => [data, ...prop]);
    useComplete(data);
    notify("Task Completed Successfully", "success", 2000);
  };

  const deleteTask = (data) => {
    restMainList(data);
    setDeleteList((prop) => [data, ...prop]);
    useDelete(data);
    notify("Task Deleted Successfully", "success", 2000);
  };

  const pauseTask = (data) => {
    restMainList(data);
    setPauseList((prop) => [data, ...prop]);
    usePause(data);
    notify("Task Paused Successfully", "success", 2000);
  };

  const formater = () => {
    setMainList([]);
    setCompleteList([]);
    setDeleteList([]);
    notify("Data deleted successfully", "info");
    localStorage.clear();
  };

  const checkFormaterStatus = () => {
    if (
      mainList.length == 0 &&
      completeList.length == 0 &&
      pauseList.length == 0
    ) {
      return true;
    }
    return false;
  };

  const createTask = () => {
    setFormStatus(true);
  };

  useEffect(() => {
    checkFormaterStatus();
  }, [mainList, completeList, pauseList]);
  return (
    <section className="h-screen bg-slate-500 flex justify-center items-center">
      <div className="w-1/2  bg-white h-max  flex-col mx-auto rounded-md relative flex p-10">
        <div className="text-bold flex items-center">
          <Link to={"/"} data-id="home-route">
            <h3 className="underline cursor-pointer">Home</h3>
          </Link>
          {baseUrl.pathname != "/" && <MdArrowRight />}
          <Link to={"/complete"}>
            <h3 className="underline cursor-pointer">
              {baseUrl.pathname == "/"
                ? null
                : baseUrl.pathname.replace("/", "")}
            </h3>
          </Link>
        </div>

        <div className="w-full px-5 flex justify-between items-center">
          <div
            style={{
              left: !formStatus ? "-100%" : "50%",
              transition: "left ease .1s",
            }}
            className="flex fixed p-10 z-10 bg-slate-300 -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2 flex-col gap-4 items-start w-max "
          >
            <h1 className="text-xl  py-2 mb-5 font-medium border-b-2 border-gray-800">
              Create new task
            </h1>
            <button
              onClick={() => setFormStatus(false)}
              className="absolute top-5 right-5 text-xl"
            >
              <MdOutlineClose />
            </button>
            <input
              data-id="task-input"
              placeholder="title"
              type="text"
              ref={input_data}
              disabled={baseUrl.pathname != "/"}
              style={{
                cursor: baseUrl.pathname == "/" ? "auto" : "not-allowed",
              }}
              onKeyDown={({ code }) => (code == "Enter" ? appendTask() : null)}
              className="bg-slate-400 w-full rounded-sm p-5 font-medium text-lg text-slate-700 placeholder:text-slate-500 outline-none border-none  h-7"
            />
            <input
              ref={input_date}
              onInput={handelDate}
              type="datetime-local"
              data-id="date-input"
              disabled={baseUrl.pathname != "/"}
              style={{
                cursor: baseUrl.pathname == "/" ? "auto" : "not-allowed",
              }}
              className="bg-slate-400 w-full  px-5 py-2 rounded-sm text-slate-700 font-bold"
            />
            <textarea
              name=""
              className="bg-slate-400 w-full h-28 rounded-sm p-5 font-medium text-lg text-slate-700 placeholder:text-slate-500 outline-none border-none"
              id=""
              cols="30"
              rows="10"
              ref={input_description}
              placeholder="description..."
            ></textarea>
            <button
              data-id="add-button"
              onClick={appendTask}
              className="px-10 hover:bg-slate-400 hover:text-gray-900 font-semibold py-2 text-sm rounded-sm text-slate-400 self-end bg-slate-800 "
            >
              ADD
            </button>
          </div>
          <div>
            <div className="flex my-10 gap-10">
              <div className="flex gap-3 text-lg">
                <button
                  className="text-green-500"
                  onClick={() => setMainList(SortDate(mainList))}
                >
                  <PiArrowBendLeftUpDuotone />
                </button>
                <button
                  className="text-red-400"
                  onClick={() => setMainList(SortDate(mainList, "down"))}
                >
                  <PiArrowBendLeftDownDuotone />
                </button>
              </div>
              <Link to={"complete"} data-id="complete-route">
                <div className="flex items-center cursor-pointer gap-3 text-green-500">
                  <AiOutlineFileDone />({completeList.length})
                </div>
              </Link>
              <Link data-id="delete-route" to={"delete"}>
                <div className="flex items-center cursor-pointer gap-3 text-red-400">
                  <AiFillDelete />({deleteList.length})
                </div>
              </Link>
              <Link to={"pause"}>
                <div className="flex items-center cursor-pointer gap-3 text-yellow-300">
                  <BsFillPauseFill />({pauseList.length})
                </div>
              </Link>
            </div>
          </div>
          <button
            data-id="clear-button"
            className="text-3xl"
            onClick={formater}
            disabled={checkFormaterStatus()}
            style={{ opacity: checkFormaterStatus() ? ".4" : "1" }}
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
            baseUrl.pathname == "/" &&
            mainList.map((e) => (
              <div
                key={e.id}
                className="todo-box w-full   group relative rounded-md  bg-slate-800 h-16 flex items-center p-8 justify-between"
              >
                <div className="flex gap-5 ">
                  <div className="text-cyan-500 font-semibold text-lg">
                    {e.title}
                  </div>
                  <div className="text-cyan-500 font-semibold text-lg">
                    {timeFormater(e.date)}
                  </div>
                  <div
                    style={{ transition: "all ease .3s" }}
                    className="absolute z-10 group-hover:opacity-100 text-gray-900 font-medium text-lg opacity-0 group-hover:scale-100 scale-0 top-16 left-[0px] rounded-md rounded-t-none w-full p-5   bg-slate-400"
                  >
                    {e.description}
                  </div>
                </div>
                <div className="flex gap-5">
                  <button
                    onClick={() => completeTask(e)}
                    data-id="complete-button"
                    className="w-5 h-5 text-2xl text-green-500"
                  >
                    <AiOutlineFileDone />
                  </button>
                  <button
                    onClick={() => pauseTask(e)}
                    className="w-5 h-5 text-2xl text-yellow-300 "
                  >
                    <BsFillPauseFill />
                  </button>
                  <button
                    onClick={() => deleteTask(e)}
                    className="w-5 h-5 text-2xl text-red-500"
                    data-id="deleter-button"
                  >
                    <AiFillDelete />
                  </button>
                </div>
              </div>
            ))}
          <Outlet />
        </div>
        <button
          data-id="add-button"
          onClick={createTask}
          className="px-10 hover:bg-slate-400 hover:text-gray-900 font-semibold py-2 text-sm rounded-sm text-slate-400 absolute right-3 bottom-2 bg-slate-800 "
        >
          Create
        </button>
      </div>
    </section>
  );
};
