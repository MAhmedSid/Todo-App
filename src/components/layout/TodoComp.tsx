import React from "react";

import AddTask from "./AddTask";
import List from "../atoms/List";
import Heading from "../atoms/Heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

import { Roboto } from "next/font/google";
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tasks`, {
      method: "GET",
      cache: "no-store",
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
      <div className="md:w-96 h-[555px] md:h-[580px] bg-black text-black backdrop-blur-lg shadow-xl bg-opacity-50 rounded-2xl flex flex-col items-center p-4">
        <Tabs defaultValue="tasks" className="w-full flex flex-col ">
          <TabsList className="bg-transparent mb-4">
            <TabsTrigger className="text-lg" value="tasks">
              Tasks
            </TabsTrigger>
            <TabsTrigger className="text-lg " value="lists">
              Lists
            </TabsTrigger>
          </TabsList>
          <TabsContent className="flex flex-col items-center" value="tasks">
            <List data={data} toast={toast} />
            <AddTask toast={toast} />
          </TabsContent>
          <TabsContent className="text-white" value="lists">
            List Content can be created, the database is ready...{" "}
          </TabsContent>
        </Tabs>
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
