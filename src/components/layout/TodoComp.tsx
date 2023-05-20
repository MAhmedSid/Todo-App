"use client";
import React, { useState } from "react";
import TaskComp from "./TaskComp";

export const TodoComp = () => {
  const [showLists, setShowLists] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center gap-y-4">

      <div className="flex w-full justify-between">
        <button
          className="bg-black bg-opacity-70 text-base py-2 px-3 rounded-full"
          disabled={true}
        >
          Select List
        </button>
        <h1 className="text-4xl">DUDE{"'"}S TODO</h1>
      </div>

      {showLists ? "" : <TaskComp />}


    </div>
  );
};
