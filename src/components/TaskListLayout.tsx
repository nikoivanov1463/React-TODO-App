import { motion } from "motion/react";
import type {
  TasksLayoutType,
  UsersResponseType,
} from "../types/MyCustomTypes";
import { useState } from "react";

const TaskListLayout = ({
  filteredTasks,
  handleTaskCompletion,
  fetchedUsers,
  filterByUserId,
  setFilterByUserId,
  limit,
  setLimitChange: handleLimitChange,
  listTitle,
}: TasksLayoutType) => {
  const [hoveredTaskId, setHoveredTaskId] = useState<number | null>(null);

  const [selectedSort, setSelectedSort] = useState("asc");

  const filteredTasksByUserId = filterByUserId
    ? filteredTasks.filter((task) => task.userId === filterByUserId)
    : filteredTasks;

  const finalTasks =
    selectedSort === "asc"
      ? filteredTasksByUserId.sort((a, b) => a.title.localeCompare(b.title))
      : filteredTasksByUserId.sort((a, b) => b.title.localeCompare(a.title));

  const handleUserIdFiltration = (userId: number) => {
    setFilterByUserId(userId);
  };

  const handleMouseEnter = (taskId: number) => {
    setHoveredTaskId(taskId);
  };

  const handleMouseLeave = () => {
    setHoveredTaskId(null);
  };

  const handleButtonClick = (taskId: number) => {
    handleTaskCompletion(taskId);
  };

  return (
    <div className="shadow-md ring-1 ring-gray-100 max-h-fit flex-wrap p-4 rounded-xl">
      <motion.ul
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="flex flex-row justify-between items-center pb-4">
          <h2 className="text-2xl font-bold mb-4">{listTitle} Task List: </h2>
        </div>
        <div className="flex flex-row gap-2 justify-center pb-4">
          {/* Show different dropdown menus for different TaskLists */}
          {listTitle !== "Completed" ? (
            <>
              <p>Filter By Username: </p>
              <select
                onChange={(e) => handleUserIdFiltration(Number(e.target.value))}
                className="outline rounded"
              >
                <option value="0">All</option>
                {fetchedUsers.map((user: UsersResponseType) => (
                  <option value={user.id} key={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
              <p>Sort: </p>
              <select
                onChange={(e) => setSelectedSort(e.target.value)}
                className="outline rounded"
              >
                <option value="asc">Asc.</option>
                <option value="desc">Desc.</option>
              </select>
            </>
          ) : (
            <>
              <p>Date Sort: </p>
              <select className="outline rounded">
                <option value="date-asc">Date: Asc.</option>

                <option value="date-desc">Date: Desc.</option>
              </select>
            </>
          )}
        </div>

        {/* Dynamically set limit of tasks, based on the show more button */}
        {finalTasks.slice(0, limit).map((task) => (
          <li
            key={task.id}
            className="flex flex-row justify-between items-center mb-4 p-4 border-solid border-2 border-gray-200 rounded-lg"
          >
            <h3>{task.title.charAt(0).toUpperCase() + task.title.slice(1)}</h3>

            <button
              onMouseEnter={() => handleMouseEnter(task.id)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleButtonClick(task.id)}
              className={`rounded-full px-4 py-2 text-center w-36 min-w-30 ${task.completed ? "bg-green-500 hover:bg-yellow-600" : "bg-red-500 hover:bg-green-600"} cursor-pointer transition-colors duration-300`}
            >
              {hoveredTaskId === task.id
                ? task.completed
                  ? "Undo?"
                  : "Complete?"
                : task.completed
                  ? "Completed"
                  : "Pending"}
            </button>
          </li>
        ))}

        {/* Show button until all the tasks are shown */}
        {filteredTasks.length > limit ? (
          <button
            className="outline rounded"
            onClick={() => handleLimitChange(limit + 10)}
          >
            Load More
          </button>
        ) : (
          <></>
        )}
      </motion.ul>
    </div>
  );
};

export default TaskListLayout;
