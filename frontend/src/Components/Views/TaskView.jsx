import '../../Styles/Tasks.css';
import { FaTrash } from 'react-icons/fa';
function TaskView({ task }) {
  const backendURL = process.env.REACT_APP_BACKEND_URL;

  const handleDelete = async (event) => {
    const request = await fetch(`${backendURL}/api/tasks/${task._id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (request.status === 200) {
      console.log('Task Deleted');
    }
  };
  return (
    <div className="task-container">
      <div className="task-delete">
        <FaTrash onClick={handleDelete} size={25} />
      </div>
      <div className="task">{task.name}</div>
    </div>
  );
}

export { TaskView };
