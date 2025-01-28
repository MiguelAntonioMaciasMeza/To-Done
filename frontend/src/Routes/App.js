// States for tasks and authentication
import React, { useState, useEffect } from 'react';

import '../App.css';
import { Header } from '../Components/Layout/Header';
import { FormContainer } from '../Components/Layout/FormContainer';
import { Footer } from '../Components/Layout/Footer';
import { TaskList } from '../Components/Layout/TaskList';

function App() {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null); // No user at first

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

  return (
    <div className="app">
      <Header />
      {user ? (
        <TaskList userTasks={tasks} />
      ) : (
        <FormContainer onLogin={handleUser} />
      )}
      <Footer />
    </div>
  );
}

export default App;
