import React from "react";

import AddTask from "./AddTask";
import List from "../atoms/List";
import Heading from "../atoms/Heading";



import { Roboto } from "next/font/google"
import { Task } from "../../lib/drizzle";
import { toast, ToastContainer } from "react-toastify";

const roboto = Roboto({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
  preload: true,
});

const getData = async () => {
  try {
    console.log(process.env.BASE_URL)
    const res = await fetch(`${process.env.BASE_URL}/api/tasks`, {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Something went wrong");
    }
    const result = await res.json();
    const data = result.data.reverse();
    return data;
  } catch (error) {
    console.log((error as { message: string }).message);
  }
};

export const TodoComp = async () => {
  const data: Task[] = await getData();

  return (
    <div
      className={`${roboto.className} flex flex-col justify-center items-center gap-y-4 mx-4 md:mx-0`}
    >
      <Heading />
      <div className="md:w-96 bg-black text-black backdrop-blur-lg shadow-xl bg-opacity-50 rounded-2xl flex flex-col items-center p-4">
        {/* @ts-ignore */}
        <List data={data} toast={toast} />
        <AddTask toast={toast} />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        limit={3}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};
