// States for tasks and authentication
import React, { useState, useEffect } from 'react';
import { FaTeeth, FaTrash, FaCheckCircle } from 'react-icons/fa';
import './App.css';
import { useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import { Header } from './Components/Header';
import { FormContainer } from './Components/FormContainer';
import { use } from 'react';
import { TaskList } from './Components/TaskList';

function App() {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null); // No user at first
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  let location = useLocation();
  let navigate = useNavigate();

  const backendURL = process.env.REACT_APP_BACKEND_URL;
  //New task
  const [newTask, setNewTask] = useState('');
  const [newTaskBool, setNewTaskBool] = useState(false);

  // Get tasks from backend WHEN user is logged in
  useEffect(() => {
    if (user) {
      const getTasks = async () => {
        try {
          console.log('GET From api/task');
          const response = await fetch(`${backendURL}/api/tasks`, {
            mode: 'cors',
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const data = await response.json();
          setTasks(data.tasks);
        } catch (error) {
          console.error('Error getting tasks from backend: ', error);
        }
      };
      getTasks();
    } else {
      setTasks([]); // Clear tasks when user is logged out
      console.log('Tasks: ', tasks);
      console.log('User: ', user);
    }
  }, [user]);

  useEffect(() => {
    if (location.pathname === '/reset-password') {
      try {
      } catch (error) {
        console.log('Error:', error);
      }
    }
  }, [location.pathname]); //Makes sure to have the HTML load before checking for change

  function RenderMessage({ message, status }) {
    return <span className={`status-message ${status}`}> {message} </span>;
  }

  async function resetPassword() {
    try {
      //Make sure the user has inserted the same password twice
      const token = null;
      console.log('This is token:', token);
      if (newPassword === confirmPassword) {
        const response = await fetch(`${backendURL}/api/resetPassword`, {
          mode: 'cors',
          method: 'PATCH',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            resetToken: token,
            newPassword: newPassword,
          }),
        });

        if (response.status === 200) {
          await setTimeout(() => {
            navigate('/');
          }, 3000);
        } else {
        }
      } else {
      }
    } catch (error) {
      console.log('Error:', error);
    }
  }

  const handleUser = (data) => {
    setUser(data);
  };

  const handleLogout = () => {
    console.log('Before logout - tasks:', tasks);

    // Clear user and tasks
    setUser(null);
    setTasks([]);

    console.log('After logout - tasks should be empty:', tasks);
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    const data = {
      name: newTask,
      completed: newTaskBool,
    };
    try {
      const res = await fetch(`${backendURL}/api/tasks`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const response = await fetch(`${backendURL}/api/tasks`, {
        mode: 'cors',
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const tasksJSON = await response.json();
      setTasks(tasksJSON.tasks);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`${backendURL}/api/tasks/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      setTasks(tasks.filter((tasks) => tasks._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const completeTask = async (id, completed) => {
    try {
      await fetch(`${backendURL}/api/tasks/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !completed }),
      });
      setTasks(
        tasks.map((task) =>
          task._id !== id ? { ...task, completed: !completed } : task,
        ),
      );
      setTasks(tasks.filter((tasks) => tasks._id !== id));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div className="app">
      <Header />
      {user ? (
        <TaskList userTasks={tasks} />
      ) : (
        <FormContainer onLogin={handleUser} />
      )}
    </div>
  );
}

export default App;
