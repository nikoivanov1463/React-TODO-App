import { useState } from "react";
import { useTasks } from "../customHooks/TaskContextHook";
import type { TasksResponseType } from "../types/MyCustomTypes";
import TaskListLayout from "./TaskListLayout";

const CompletedTaskList = () => {
  const { fetchedTasks, toggleTask } = useTasks();

  const [completedTasksLimit, setCompletedTasksLimit] = useState(10);

  const filteredPendingTasks = fetchedTasks.filter(
    (todo: TasksResponseType) => todo.completed === true,
  );

  return (
    <TaskListLayout
      filteredTasks={filteredPendingTasks}
      handleTaskCompletion={toggleTask}
      limit={completedTasksLimit}
      handleLimitChange={setCompletedTasksLimit}
      listTitle="Completed"
    />
  );
};

export default CompletedTaskList;
