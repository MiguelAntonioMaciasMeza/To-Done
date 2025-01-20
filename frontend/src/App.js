// States for tasks and authentication
import React, { useState, useEffect } from 'react';
import { FaTeeth, FaTrash, FaCheckCircle } from 'react-icons/fa';
import './App.css';
import { useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import { Header } from './Components/Header';
import { FormContainer } from './Components/FormContainer';
function App() {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null); // No user at first
  const [activeTab, setActiveTab] = useState('signin');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resetTokenVisible, setResetTokenVisible] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [containerVisible, setContainerVisible] = useState('');
  const [resetPasswordVisible, setResetPassowrdVisible] = useState('');
  let location = useLocation();
  let [params] = useSearchParams();
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
        setContainerVisible(true);
        setResetPassowrdVisible(true);
      } catch (error) {
        console.log('Error:', error);
      }
    }
  }, [location.pathname]); //Makes sure to have the HTML load before checking for change

  //Request a reset password token with the use of the user's email.
  async function requestToken() {
    try {
      const response = await fetch(`${backendURL}/api/resetToken`, {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }),
      });

      //Email is valid, now make other textfields appear
      if (response.status === 200) {
        //Toggle aditional text-fields for reset token and new password

        setMessage('Check email for your password reset token!');
        setStatus('success');
      } else if (response.status === 404) {
        setMessage('Email was not found. Please try again.');
        setStatus('error');
      }
    } catch (error) {}
  }

  function RenderMessage({ message, status }) {
    return <span className={`status-message ${status}`}> {message} </span>;
  }

  async function resetPassword() {
    try {
      //Make sure the user has inserted the same password twice
      const token = params.get('token');
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
          setMessage('Password reset correctly. You will be redirected soon.');
          setStatus('success');
          await setTimeout(() => {
            setContainerVisible(false);
            setResetPassowrdVisible(false);
            setMessage(null);
            setStatus(null);
            navigate('/');
          }, 3000);
        } else {
          setMessage('Error occured while trying to reset password.');
          setStatus('error');
        }
      } else {
        setMessage('Passwords do not match.');
        setStatus('error');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  }
  // Sign up function
  const handleSignup = async (e) => {
    e.preventDefault();
    const data = {
      email: email,
      username: username,
      password: password,
    };
    try {
      const res = await fetch(`${backendURL}/api/createUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (res.status == 200) {
        setMessage('User created sucessfully');
        setStatus('success');
      } else if (res.status == 409) {
        const data = await res.json();
        setMessage(data.status);
        setStatus('error');
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  // Login function
  const handleLogin = async (e) => {
    // ...
    e.preventDefault(); // This single line was all I needed for it to work....
    try {
      console.log('Attempting POST request');
      const response = await fetch(`${backendURL}/api/login`, {
        mode: 'cors',
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, password: password }),
      });
      if (response.status === 200) {
        const data = await response.json();
        setUser(data);
        setMessage(null);
        setStatus(null);
      } else if (response.status === 401 || response.status === 400) {
        setMessage('Incorrect Username/Password. Please try agan.');
        setStatus('error');
      } else {
        setUser(null); // Reset user on failed login
        setTasks([]);
      }
    } catch (err) {
      console.log('Error while attempting to login', err);
    }

    console.log(user);
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
      {user ? <p>Login</p> : <FormContainer />}
    </div>
  );
}

export default App;
