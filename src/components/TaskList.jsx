import React, { useCallback } from 'react';
import Task from './Task';
import { taskListBoxState } from '../store';

const TaskList = () => {
  const { updateState } = taskListBoxState.useUpdateState();
  const taskListBox = taskListBoxState.useTaskListBoxValue();

  const events = {
    onPinTask: useCallback((taskId, currentState) => {
      updateState(taskListBox, taskId, currentState === 'TASK_PINNED' ? 'TASK_INBOX' : 'TASK_PINNED');
    }, [taskListBox, updateState]),

    onArchiveTask: useCallback((taskId, currentState) => {
      updateState(taskListBox, taskId, currentState === 'TASK_ARCHIVED' ? 'TASK_INBOX' : 'TASK_ARCHIVED');
    }, [taskListBox, updateState]),
  };

  const LoadingRow = (
    <div className="loading-item">
      <span className="glow-checkbox" />
      <span className="glow-text" >
        <span>Loading</span><span>cool</span><span>state</span>
      </span>
    </div>
  );

  if (taskListBox.loading) {
    return (
      <div className="list-items" dta-testid="loadng" key={"loading"}>
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
      </div>
    );
  }

  if (taskListBox.tasks.length === 0) {
    return (
      <div className="list-items" key={"empty"} data-testid="empty">
        <div className="wrapper-message">
          <span className="icon-check" />
          <p className="title-message">You have no tasks</p>
          <p className="subtitle-message">Sit back and relax</p>
        </div>
      </div>
    );
  }

  const tasksInOrder = [
    ...taskListBox.tasks.filter(t => t.state === "TASK_PINNED"),
    ...taskListBox.tasks.filter(t => t.state !== "TASK_PINNED"),
  ]
  return (
    <div className="list-items">
      {tasksInOrder.map(task => (
        <Task key={task.id} task={task} {...events} />
      ))}
    </div>
  );
};

// TaskList.propTypes = {
//   loading: PropTypes.bool,
//   tasks: PropTypes.arrayOf(Task.propTypes.task).isRequired,
//   onPiTask: PropTypes.func,
//   onArchiveTask: PropTypes.func,
// };

// TaskList.defaultProps = {
//   loading: false,
// };

export default TaskList;
