import TaskListLayout from "./TaskListLayout";
import type { TasksResponseType } from "../types/MyCustomTypes";
import { useTasks } from "../customHooks/TaskContextHook";
import { useState } from "react";
import { useUsers } from "../customHooks/UserContextHook";

const TaskList = () => {
  const { fetchedTasks, toggleTask } = useTasks();
  const { fetchedUsers, filterByUserId, setFilterByUserId } = useUsers();

  const [pendingTasksLimit, setPendingTasksLimit] = useState(10);

  const filteredPendingTasks = fetchedTasks.filter(
    (todo: TasksResponseType) => todo.completed === false,
  );

  return (
    <TaskListLayout
      filteredTasks={filteredPendingTasks}
      handleTaskCompletion={toggleTask}
      fetchedUsers={fetchedUsers}
      filterByUserId={filterByUserId}
      setFilterByUserId={setFilterByUserId}
      limit={pendingTasksLimit}
      setLimitChange={setPendingTasksLimit}
      listTitle="Pending"
    />
  );
};

export default TaskList;
