{
  /* Provider types */
}

export type TasksResponseType = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export type TaskContextType = {
  fetchedTasks: TasksResponseType[];
  toggleTask: (id: number) => void;
};

{
  /* TaskList Types */
}

export type TasksLayoutType = {
  filteredTasks: TasksResponseType[];
  handleTaskCompletion: (taskId: number) => void;
  limit: number;
  handleLimitChange: (newLimit: number) => void;
  listTitle: string;
};
