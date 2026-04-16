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

  {
    /* Only sort tasks that belong in the pending list */
  }
  const finalTasks =
    listTitle === "Pending"
      ? selectedSort === "asc"
        ? filteredTasksByUserId.sort((a, b) => a.title.localeCompare(b.title))
        : filteredTasksByUserId.sort((a, b) => b.title.localeCompare(a.title))
      : filteredTasksByUserId;

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
    <div className="flex flex-col bg-white shadow-xl shadow-gray-200/50 border border-gray-100 p-4 md:p-8 rounded-3xl w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col"
      >
        {/* HEADER */}
        <div className="flex flex-row flex-wrap items-center justify-between gap-6 mb-10">
          <h2 className="text-3xl font-black text-gray-800 tracking-tight min-w-[200px]">
            {listTitle} <span className="text-gray-300 font-light">Tasks</span>
          </h2>

          <div className="flex flex-row flex-wrap items-center gap-4">
            {listTitle !== "Completed" ? (
              <div className="flex flex-row flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-xl border border-gray-100 flex-shrink-0">
                  <label className="text-xs font-bold text-gray-400 uppercase">
                    User
                  </label>
                  <select
                    onChange={(e) =>
                      handleUserIdFiltration(Number(e.target.value))
                    }
                    className="bg-transparent outline-none cursor-pointer font-bold text-gray-700 text-sm"
                  >
                    <option value="0">All</option>
                    {fetchedUsers.map((user: UsersResponseType) => (
                      <option value={user.id} key={user.id}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-xl border border-gray-100 flex-shrink-0">
                  <label className="text-xs font-bold text-gray-400 uppercase">
                    Sort
                  </label>
                  <select
                    onChange={(e) => setSelectedSort(e.target.value)}
                    className="bg-transparent outline-none cursor-pointer font-bold text-gray-700 text-sm"
                  >
                    <option value="asc">Asc.</option>
                    <option value="desc">Desc.</option>
                  </select>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Date Sort:
                </label>
                <select className="bg-transparent outline-none cursor-pointer font-bold text-gray-700 text-sm">
                  <option value="asc">Asc.</option>
                  <option value="desc">Desc.</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* LIST SECTION */}
        <ul className="flex flex-col gap-4">
          {/* Dynamically set limit of tasks, based on the show more button */}
          {finalTasks.slice(0, limit).map((task) => (
            <motion.li
              layout
              key={task.id}
              className="flex flex-row flex-wrap sm:flex-nowrap items-center justify-between gap-4 p-5 bg-white border border-gray-100 rounded-2xl hover:border-gray-200 hover:shadow-md transition-all duration-200"
            >
              <div className="flex-1 min-w-[250px] flex flex-col gap-1">
                <h3 className="text-lg font-bold text-gray-700 leading-tight break-words">
                  {task.title.charAt(0).toUpperCase() + task.title.slice(1)}
                </h3>
                {task.completed && task.date && (
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-tighter">
                      Completed: {task.date}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex-shrink-0 w-full sm:w-auto flex justify-end">
                <button
                  onMouseEnter={() => handleMouseEnter(task.id)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleButtonClick(task.id)}
                  className={`
                    flex items-center justify-center
                    rounded-full px-8 py-3 text-sm font-black text-white 
                    transition-all duration-300 shadow-lg active:scale-95
                    w-full sm:w-40 h-12 flex-shrink-0 cursor-pointer
                    ${task.completed ? "bg-green-500 hover:bg-orange-500 shadow-green-100" : "bg-red-500 hover:bg-green-600 shadow-red-100"}
                  `}
                >
                  {hoveredTaskId === task.id
                    ? task.completed
                      ? "Undo?"
                      : "Complete?"
                    : task.completed
                      ? "Done"
                      : "Pending"}
                </button>
              </div>
            </motion.li>
          ))}
        </ul>

        {/* FOOTER */}
        <div className="flex justify-center mt-10">
          {filteredTasks.length > limit ? (
            <button
              className="bg-gray-800 text-white px-10 py-4 rounded-2xl font-bold text-sm hover:bg-black transition-all shadow-xl active:scale-95 cursor-pointer"
              onClick={() => handleLimitChange(limit + 10)}
            >
              Load More Tasks
            </button>
          ) : (
            <span className="text-gray-300 text-xs font-medium uppercase tracking-[0.2em]">
              End of list
            </span>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default TaskListLayout;
