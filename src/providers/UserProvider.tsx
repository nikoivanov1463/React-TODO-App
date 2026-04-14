import { createContext, useEffect, useState, type ReactNode } from "react";
import type {
  UserContextType,
  UsersResponseType,
} from "../types/MyCustomTypes";

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [fetchedUsers, setFetchedUsers] = useState<UsersResponseType[]>([]);

  const [filterByUserId, setFilterByUserId] = useState(0);

  const fetchUsers = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();

    setFetchedUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UserContext.Provider
      value={{
        fetchedUsers,
        setFetchedUsers,
        filterByUserId,
        setFilterByUserId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
