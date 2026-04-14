import { useEffect, useState, type ReactNode } from "react";
import type { TasksResponseType } from "../types/MyCustomTypes";
import { createContext } from "react";
import type { TaskContextType } from "../types/MyCustomTypes";

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined,
);

const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [fetchedTasks, setFetchedTasks] = useState<TasksResponseType[]>([]);

  const fetchAll = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await response.json();

    setFetchedTasks(data);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const toggleTask = (id: number) => {
    setFetchedTasks((allPrevFetchedTasks) =>
      allPrevFetchedTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  return (
    <TaskContext.Provider value={{ fetchedTasks, toggleTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
