import "./App.css";
import CompletedTaskList from "./components/CompletedTaskList";
import TaskList from "./components/PendingTaskList";
import TaskProvider from "./providers/TaskProvider";

function App() {
  return (
    <div className="flex flex-row justify-between flex-wrap">
      <div className="flex flex-row justify-between gap-16">
        <TaskProvider>
          <TaskList />
          <CompletedTaskList />
        </TaskProvider>
      </div>
    </div>
  );
}

export default App;
