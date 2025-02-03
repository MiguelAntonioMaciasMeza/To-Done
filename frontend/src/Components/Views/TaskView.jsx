import '../../Styles/Tasks.css';
import { FaTrash } from 'react-icons/fa';
function TaskView({ task, onDelete, taskID, onUpdate }) {
  const backendURL = process.env.REACT_APP_BACKEND_URL;

  const handleDelete = async (event) => {
    const request = await fetch(`${backendURL}/api/tasks/${taskID}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (request.status === 200) {
      onUpdate();
    }
  };
  return (
    <div className="task-container">
      <div className="task-delete">
        <FaTrash onClick={handleDelete} size={25} />
      </div>
      <div className="task">{task}</div>
    </div>
  );
}

export { TaskView };
