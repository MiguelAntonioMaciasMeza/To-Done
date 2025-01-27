import { AddTask } from '../Layout/AddTask';
import { TaskView } from '../Views/TaskView';
import '../../Styles/Tasks.css';
//Manages list
function TaskList({ userTasks }) {
  const renderedTask = userTasks.map((task, index) => {
    return (
      <div className="task-list-container">
        <div className="task-list-items">
          <TaskView task={task} />
        </div>
      </div>
    );
  });
  return (
    <div>
      <AddTask />
      {renderedTask}
    </div>
  );
}

export { TaskList };
