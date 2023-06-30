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
import { useAppender } from "./hooks/useAppender";
import { useGState } from "./context/ContextState";
import { useComplete } from "./hooks/useComplete";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useDelete } from "./hooks/useDelete";
import { usePause } from "./hooks/usePause";
import { SortDate, notify } from "./utils/GMethods";

export const App = () => {
  const [id, setId] = useState(new Date().getTime());
  const input_data = useRef();
  const baseUrl = useLocation();
  const input_date = useRef();

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
    if (input_data.current.value != "" && input_date.current.value != "") {
      setMainList((prop) =>
        SortDate([
          {
            id,
            title: input_data.current.value,
            date: input_date.current.value,
          },
          ...prop,
        ])
      );
      useAppender(
        {
          id,
          title: input_data.current.value,
          date: input_date.current.value,
        },
        false
      );
      setTimeout(() => {
        input_data.current.value = "";
        input_date.current.value = "";
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

  const handelDate = ({ target }) => {
    const userDate = new Date(target.value);
    const currentDate = new Date();

    userDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);

    if (userDate.getTime() < currentDate.getTime()) {
      notify(`Not valid date ${target.value}`, "warn");
      target.value = "";
    }
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

  useEffect(() => {
    checkFormaterStatus();
  }, [mainList, completeList, pauseList]);
  return (
    <section className="h-screen bg-slate-500 flex justify-center items-center">
      <div className="w-max  bg-white h-max  flex-col mx-auto rounded-md relative flex p-10">
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
          <div className="flex gap-4 items-center w-full ">
            <input
              data-id="task-input"
              placeholder="Create new task..."
              type="text"
              ref={input_data}
              disabled={baseUrl.pathname != "/"}
              style={{
                cursor: baseUrl.pathname == "/" ? "auto" : "not-allowed",
              }}
              onKeyDown={({ code }) => (code == "Enter" ? appendTask() : null)}
              className="bg-slate-400 rounded-sm p-5 font-medium text-lg text-slate-700 placeholder:text-slate-500 outline-none border-none w-1/3 h-7"
            />
            <input
              ref={input_date}
              onInput={handelDate}
              type="date"
              data-id="date-input"
              disabled={baseUrl.pathname != "/"}
              style={{
                cursor: baseUrl.pathname == "/" ? "auto" : "not-allowed",
              }}
              className="bg-slate-400 px-5 py-2 rounded-sm text-slate-700 font-bold"
            />
          </div>
          <div>
            <div className="flex m-10 gap-10">
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
                className="todo-box w-full rounded-md  bg-slate-800 h-16 flex items-center p-8 justify-between"
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
          onClick={appendTask}
          className="px-10 hover:bg-slate-400 hover:text-gray-900 font-semibold py-2 text-sm rounded-sm text-slate-400 absolute right-3 bottom-2 bg-slate-800 "
        >
          Create
        </button>
      </div>
    </section>
  );
};
