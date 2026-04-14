import { useContext } from "react";
import { UserContext } from "../providers/UserProvider";

export const useUsers = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUsers hook must be used inside the UserProvider!");
  }

  return context;
};
