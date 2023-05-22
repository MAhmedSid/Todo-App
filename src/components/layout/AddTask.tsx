"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { IoSend } from "react-icons/io5";

type taskType = {
  listid: number;
  description: string;
  status: boolean;
};

const ListComp = ({ toast }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { refresh } = useRouter();

  //BELOW CODE TO INSERT TASKS
  const [task, setTask] = useState<taskType>({
    listid: 1,
    description: "",
    status: false,
  });

  const handleChange = (e: any) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    if (task.description === "") {
      toast.error("Please enter a task");
      setIsLoading(false);
      return;
    }
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify(task),
      });
      if (response.ok) {
        setTask({ ...task, description: "" });
        toast("✔️ Task added successfully");
        refresh();
      } else {
        toast.error("Task not added");
        throw new Error("Something went wrong at Server");
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex gap-x-2 w-full ">
        <input
          name="description"
          onChange={handleChange}
          value={task.description}
          type="text"
          autoComplete="off"
          placeholder="Add a task"
          className="md:h-12 rounded-full px-4 text-lg w-full focus-visible:outline-none focus:border-primaryOrange border-2 border-transparent "
        />
        <button
          type="submit"
          disabled={task.description === "" || isLoading ? true : false}
          className={`bg-black  bg-opacity-50 rounded-full px-3 py-3 shrink-0 text-white  transition-all duration-300 
          ${
            isLoading === true || task.description === ""
              ? "opacity-50 cursor-not-allowed hover:scale-100"
              : "hover:scale-110 hover:text-primaryOrange hover:bg-white"
          }`}
        >
          {isLoading ? (
            <Image src="/loading.svg" width={25} height={25} alt="loading" />
          ) : (
            <IoSend className="text-2xl  " />
          )}
        </button>
      </form>
      <div className="bg-black  h-1 w-40 rounded-xl mt-4"></div>
    </>
  );
};

export default ListComp;
