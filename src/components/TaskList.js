import React from 'react';
import Task from './Task';
import PropTypes from 'prop-types';
import { taskListBoxState } from '../store';

const TaskList = () => {
  const {tasks, loading} = taskListBoxState.useTaskListBoxValue();

  const events = {
    onPinTask: (_taskId) => {},
    onArchiveTask: (_taskId) => {},
  };

  const LoadingRow = (
    <div className="loading-item">
      <span className="glow-checkbox" />
      <span className="glow-text" >
        <span>Loading</span><span>cool</span><span>state</span>
      </span>
    </div>
  );

  if (loading) {
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

  if (tasks.length === 0) {
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
    ...tasks.filter(t => t.state === "TASK_PINNED"),
    ...tasks.filter(t => t.state !== "TASK_PINNED"),
  ]
  return (
    <div className="list-items">
      {tasksInOrder.map(task => (
        <Task key={task.id} task={task} {...events} />
      ))}
    </div>
  );
};

TaskList.propTypes = {
  loading: PropTypes.bool,
  tasks: PropTypes.arrayOf(Task.propTypes.task).isRequired,
  onPiTask: PropTypes.func,
  onArchiveTask: PropTypes.func,
};

TaskList.defaultProps = {
  loading: false,
};

export default TaskList;
