import { AddTask } from '../Layout/AddTask';
import { TaskView } from '../Views/TaskView';
import '../../Styles/Tasks.css';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';

//Manages list
function TaskList({ onTaskUpdate, tasks, user }) {
  const handleTaskUpdate = () => {
    onTaskUpdate();
  };
  console.log(tasks);
  const renderedTask = tasks.map((task, index) => {
    return (
      <div className="task-list-items">
        <TaskView
          task={task.name}
          onUpdate={handleTaskUpdate}
          taskID={task._id}
          key={task._id}
        />
      </div>
    );
  });

  return (
    <div className="task-list-container">
      <AddTask onUpdate={handleTaskUpdate} />
      {renderedTask}
    </div>
  );
}

export { TaskList };
