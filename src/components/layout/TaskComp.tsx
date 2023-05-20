import React from "react";
import { IoSend } from "react-icons/io5";

const ListComp = () => {
  return (
    <div className="bg-black backdrop-blur-lg shadow-xl bg-opacity-50 rounded-2xl flex flex-col items-center p-4">


      <h2 className="text-xl">LIST TITLE</h2>
      <div className="task-list h-96"></div>
      <form className="flex gap-x-2">
        <input
          type="text"
          placeholder="Add a task"
          className="md:h-12 rounded-full px-4 text-lg"
        />
        <button
          type="submit"
          className="bg-black bg-opacity-50 rounded-full px-3 py-3 shrink-0 text-white"
        >
          <IoSend className="text-2xl" />
        </button>
      </form>
      <div className="bg-black  h-1 w-40 rounded-xl mt-4"></div>



    </div>
  );
};

export default ListComp;
