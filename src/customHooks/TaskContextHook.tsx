import { useContext } from "react";
import { TaskContext } from "../providers/TaskProvider";

export const useTasks = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTasks hook must be used within the TaskProvider!");
  }

  return context;
};
