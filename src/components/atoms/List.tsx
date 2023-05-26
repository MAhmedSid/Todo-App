"use client";

import React, { useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation"


import { Task } from "../../lib/drizzle";

import { Reorder } from "framer-motion";
import { TiDeleteOutline } from "react-icons/ti";

const List = ({ data, toast }: { data: Task[]; toast: any }) => {
 
  
  const router = useRouter();
  const [items, setItems] = useState(data);
  const [isPending, startTransition] = useTransition();
  const [isDeleting, setIsDeleting] = useState(false);

  const isMutating = isPending || isDeleting;

  useEffect(() => {
    setItems(data);
  }, [data]);

  const deleteTask = async (taskid: number) => {
    try {
      setIsDeleting(true);
      const res = await fetch(`/api/tasks?id=${taskid}`, {
        method: "DELETE",
      });
      if (res.ok) {
        startTransition(() => {
          router.refresh();
        });
        toast("✔️ Note Deleted Successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error("Task not Deleted");
        throw new Error("Something went wrong in Server");
      }
    } catch (error) {
      console.log(error);
    }
    setIsDeleting(false);
  };

  return (
    <>
      <Reorder.Group
        axis="y"
        values={items}
        onReorder={setItems}
        className="flex flex-col h-96 w-full gap-y-3 overflow-y-scroll mb-4 px-2  scrollbar-track-transparent scrollbar-thumb-rounded-lg scrollbar scrollbar-thumb-white"
      >
        {items.map((task: Task) => (
          <Reorder.Item
            value={task}
            key={task.id}
            className="flex bg-white rounded-lg p-4 bg-opacity-10 justify-between gap-x-4 cursor-grab"
          >
            <p className="md:max-w-[15rem] text-xl font-light text-white break-words">
              {task.description}
            </p>
            {data.length > 3 && (
              <button
                disabled={isMutating}
                onClick={() => {
                  deleteTask(task.id);
                }}
                className="h-8"
              >
                <TiDeleteOutline
                  className={`text-3xl cursor-pointer text-white  ${
                    isMutating
                      ? "opacity-50 cursor-not-allowed"
                      : " hover:text-red-600 hover:transition-all hover:duration-300 hover:ease-in-out hover:scale-125"
                  }`}
                />
              </button>
            )}
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </>
  );
};

export default List;
