import TaskListLayout from "./TaskListLayout";
import type { TasksResponseType } from "../types/MyCustomTypes";
import { useTasks } from "../customHooks/TaskContextHook";
import { useState } from "react";

const TaskList = () => {
  const { fetchedTasks, toggleTask } = useTasks();

  const [pendingTasksLimit, setPendingTasksLimit] = useState(10);

  const filteredPendingTasks = fetchedTasks.filter(
    (todo: TasksResponseType) => todo.completed === false,
  );

  return (
    <TaskListLayout
      filteredTasks={filteredPendingTasks}
      handleTaskCompletion={toggleTask}
      limit={pendingTasksLimit}
      handleLimitChange={setPendingTasksLimit}
      listTitle="Pending"
    />
  );
};

export default TaskList;
