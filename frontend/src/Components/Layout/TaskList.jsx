import { AddTask } from '../Layout/AddTask';
import { TaskView } from '../Views/TaskView';
import '../../Styles/Tasks.css';
//Manages list
function TaskList({ userTasks }) {
  if (userTasks.length === 0) {
    return (
      <div className="task-list-container">
        <div className="task-list-items">
          <p>There are no tasks, consider adding one</p>
          <AddTask />
        </div>
      </div>
    );
  }
  const renderedTask = userTasks.map((task, index) => {
    return (
      <div className="task-list-container">
        <div className="task-list-items">
          <TaskView task={task} />
        </div>
      </div>
    );
  });
  return <div>{renderedTask}</div>;
}

export { TaskList };
