// States for tasks and authentication
import React, { useState, useEffect } from 'react';
import '../Styles/Tasks.css';
import '../App.css';
import { Header } from '../Components/Layout/Header';
import { FormContainer } from '../Components/Layout/FormContainer';
import { Footer } from '../Components/Layout/Footer';
import { TaskList } from '../Components/Layout/TaskList';

function App() {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null); // No user at first

  const backendURL = process.env.REACT_APP_BACKEND_URL;
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
      console.log(tasks);
    } catch (error) {
      console.error('Error getting tasks from backend: ', error);
    }
  };

  //Recall tasks whenever a task is removed or added.
  const handleTaskUpdate = () => {
    getTasks();
  };
  // Get tasks from backend WHEN user is logged in or changes like editing or deletionz
  useEffect(() => {
    if (user) {
      getTasks();
    } else {
      setTasks([]); // Clear tasks when user is logged out
    }
  }, [user]);

  const handleUser = (data) => {
    setUser(data);
  };

  const handleSignOut = () => {
    // Clear user and tasks
    setUser(null);
    setTasks([]);
  };

  return (
    <div className="app">
      <Header loggedIn={user} onSignOut={handleSignOut} />
      {user ? (
        <TaskList tasks={tasks} user={user} onTaskUpdate={handleTaskUpdate} />
      ) : (
        <FormContainer onLogin={handleUser} />
      )}
      <Footer />
    </div>
  );
}

export default App;
