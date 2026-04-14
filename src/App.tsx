import "./App.css";
import CompletedTaskList from "./components/CompletedTaskList";
import TaskList from "./components/PendingTaskList";
import TaskProvider from "./providers/TaskProvider";
import UserProvider from "./providers/UserProvider";

function App() {
  return (
    <div className="flex flex-row justify-between flex-wrap">
      <div className="flex flex-row justify-between gap-16">
        <TaskProvider>
          <UserProvider>
            <TaskList />
            <CompletedTaskList />
          </UserProvider>
        </TaskProvider>
      </div>
    </div>
  );
}

export default App;
