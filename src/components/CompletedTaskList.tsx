import { useState } from "react";
import { useTasks } from "../customHooks/TaskContextHook";
import type { TasksResponseType } from "../types/MyCustomTypes";
import TaskListLayout from "./TaskListLayout";
import { useUsers } from "../customHooks/UserContextHook";

const CompletedTaskList = () => {
  const { fetchedTasks, toggleTask } = useTasks();
  const { fetchedUsers, filterByUserId, setFilterByUserId } = useUsers();

  const [completedTasksLimit, setCompletedTasksLimit] = useState(10);

  const filteredPendingTasks = fetchedTasks.filter(
    (todo: TasksResponseType) => todo.completed === true,
  );

  return (
    <TaskListLayout
      filteredTasks={filteredPendingTasks}
      handleTaskCompletion={toggleTask}
      fetchedUsers={fetchedUsers}
      filterByUserId={filterByUserId}
      setFilterByUserId={setFilterByUserId}
      limit={completedTasksLimit}
      setLimitChange={setCompletedTasksLimit}
      listTitle="Completed"
    />
  );
};

export default CompletedTaskList;
