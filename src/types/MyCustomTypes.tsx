import type { Dispatch, SetStateAction } from "react";

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

export type UsersResponseType = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: number;
    geo: { lat: number; lng: number };
  };
};

export type UserContextType = {
  fetchedUsers: UsersResponseType[];
  setFetchedUsers: Dispatch<SetStateAction<UsersResponseType[]>>;
  filterByUserId: number;
  setFilterByUserId: Dispatch<SetStateAction<number>>;
};

{
  /* TaskList Types */
}

export type TasksLayoutType = {
  filteredTasks: TasksResponseType[];
  handleTaskCompletion: (taskId: number) => void;
  fetchedUsers: UsersResponseType[];
  filterByUserId: number;
  setFilterByUserId: Dispatch<SetStateAction<number>>;
  limit: number;
  setLimitChange: (newLimit: number) => void;
  listTitle: string;
};
