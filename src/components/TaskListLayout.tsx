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

  const [dateSort, setDateSort] = useState("desc");

  const filteredTasksByUserId = filterByUserId
    ? filteredTasks.filter((task) => task.userId === filterByUserId)
    : filteredTasks;

  {
    /* Only sort tasks that belong in the pending list by title, else if in completed list by date */
  }
  const finalTasks = [...filteredTasksByUserId].sort((a, b) => {
    if (listTitle === "Completed") {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();

      return dateSort === "asc" ? dateA - dateB : dateB - dateA;
    } else {
      return selectedSort === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    }
  });

  const handleDateSorting = (sortingType: string) => {
    setDateSort(sortingType);
  };

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
    <div className="w-full max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm p-5 md:p-10">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 border-b border-gray-50 pb-6">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            {listTitle} <span className="text-gray-400 font-medium">Tasks</span>
          </h2>

          <div className="flex flex-wrap items-center gap-3">
            {/* User Filter - Shows only in the pending list */}
            {listTitle !== "Completed" && (
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg">
                <label className="text-[0.5rem] font-bold text-gray-400 uppercase tracking-wider">
                  User
                </label>
                <select
                  onChange={(e) =>
                    handleUserIdFiltration(Number(e.target.value))
                  }
                  className="bg-transparent outline-none cursor-pointer font-semibold text-gray-700 text-xs"
                >
                  <option value="0">All</option>
                  {fetchedUsers.map((user: UsersResponseType) => (
                    <option value={user.id} key={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Sort Filter */}
            {listTitle === "Completed" ? (
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg">
                <label className="text-[0.5rem] font-bold text-gray-400 uppercase tracking-wider">
                  Date sort:
                </label>
                {/* TODO: Complete */}
                <select
                  onChange={(e) => handleDateSorting(e.target.value)}
                  className="bg-transparent outline-none cursor-pointer font-semibold text-gray-700 text-xs"
                >
                  <option value="desc">Desc.</option>
                  <option value="asc">Asc.</option>
                </select>
              </div>
            ) : (
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg">
                <label className="text-[0.5rem] font-bold text-gray-400 uppercase tracking-wider">
                  Sort:
                </label>
                <select
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className="bg-transparent outline-none cursor-pointer font-semibold text-gray-700 text-xs"
                >
                  <option value="asc">A-Z</option>
                  <option value="desc">Z-A</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* LIST SECTION */}
        <ul className="space-y-3">
          {/* Dynamically set limit of tasks, based on the show more button */}
          {finalTasks.slice(0, limit).map((task) => (
            <motion.li
              layout
              key={task.id}
              className="group flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl hover:border-blue-200 hover:shadow-sm transition-colors transition-shadow duration-200"
            >
              <div className="flex flex-col gap-1 pr-4">
                <h3 className="text-1 font-semibold text-gray-800 leading-snug">
                  {task.title.charAt(0).toUpperCase() + task.title.slice(1)}
                </h3>
                {task.completed && (
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    <span className="text-[0.5rem] font-bold text-gray-400 uppercase tracking-tight">
                      Done {task.date && `• ${task.date}`}
                    </span>
                  </div>
                )}
              </div>

              <button
                onMouseEnter={() => handleMouseEnter(task.id)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleButtonClick(task.id)}
                className={`
              shrink-0 px-5 py-2 w-30 rounded-lg text-xs font-bold transition-all duration-200 active:scale-95 cursor-pointer
              ${
                task.completed
                  ? "bg-green-50 text-green-600 hover:bg-yellow-50 hover:text-yellow-600"
                  : "bg-red-50 text-red-600 hover:bg-green-50  hover:text-green-600"
              }
            `}
              >
                {hoveredTaskId === task.id
                  ? task.completed
                    ? "Undo?"
                    : "Complete?"
                  : task.completed
                    ? "Completed"
                    : "Pending"}
              </button>
            </motion.li>
          ))}
        </ul>

        {/* FOOTER */}
        <div className="flex justify-center mt-8">
          {filteredTasks.length > limit ? (
            <button
              className="text-sm font-bold text-gray-500 hover:text-gray-900 hover:bg-gray-100 px-6 py-2.5 rounded-xl transition-all cursor-pointer"
              onClick={() => handleLimitChange(limit + 10)}
            >
              Load More Tasks
            </button>
          ) : (
            <span className="text-gray-300 text-[0.8rem] font-bold uppercase tracking-[0.2em]">
              End of list
            </span>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default TaskListLayout;
