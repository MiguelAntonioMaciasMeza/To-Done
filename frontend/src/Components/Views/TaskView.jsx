import '../../Styles/Tasks.css';
function TaskView({ task }) {
  return <div className="task">{task.name}</div>;
}

export { TaskView };
