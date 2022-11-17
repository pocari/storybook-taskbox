import { useEffect } from "react";
import { taskListBoxState } from "../store";
import TaskList from "./TaskList";

const InboxScreen = () => {
  const { fetchTasks } = taskListBoxState.useFetchTasks();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const {error} = taskListBoxState.useTaskListBoxValue();

  if (error) {
    return (
      <div className="page lists-show">
        <div className="wrapper-message">
          <span className="icon-face-sad" />
          <p className="title-message">Oh no!</p>
          <p className="subtitle-message">Something went wrong</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page lists-show">
      <nav>
        <h1 className="title-page">TaskBox</h1>
      </nav>
      <TaskList/>
    </div>
  );
};

export default InboxScreen;

