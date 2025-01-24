import { TaskView } from './TaskView';

//Manages list

function TaskList({ userTasks }) {
  if (userTasks.length === 0) {
    return (
      <div>
        <p>There are no tasks, consider adding one</p>
      </div>
    );
  }
  const renderedTask = userTasks.map((task, index) => {
    console.log(index);
    return (
      <div>
        <TaskView task={task} />
      </div>
    );
  });
  return <div>{renderedTask}</div>;
}

export { TaskList };
