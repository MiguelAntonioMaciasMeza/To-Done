import { useState } from 'react';
import '../../Styles/Tasks.css';
import { StatusMessage } from '../Views/StatusMessage';
function AddTask() {
  const [taskName, setTaskName] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const handleNewTask = async (event) => {
    event.preventDefault();
    const backendURL = process.env.REACT_APP_BACKEND_URL;
    const newTask = {
      name: taskName,
      completed: false,
    };
    try {
      const response = await fetch(`${backendURL}/api/tasks`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });
      if (response.status === 201) {
        console.log('Task posted successfully');
        setMessage('Task created sucessfully.');
        setStatus('success');
      } else {
        setMessage('Error in posting task.');
        setStatus('error');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="add-task">
      <form onSubmit={handleNewTask}>
        Create a new task
        <input
          placeholder="Task"
          value={taskName}
          onChange={(event) => {
            setTaskName(event.target.value);
          }}
        />
        <button onSubmit={handleNewTask}>Create a Task</button>
        <StatusMessage message={message} status={status} />
      </form>
    </div>
  );
}

export { AddTask };
