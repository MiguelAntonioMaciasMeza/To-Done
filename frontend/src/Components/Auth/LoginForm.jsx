import '../../Styles/Form.css';
import { useState } from 'react';
function LoginForm({ onSubmit, onError }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const backendURL = process.env.REACT_APP_BACKEND_URL;

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
        onSubmit(data);
      } else if (response.status === 401 || response.status === 400) {
        console.log('Error');
        onError('Incorrect password/username, please try again.', 'error');
      } else {
      }
    } catch (err) {
      console.log('Error while attempting to login', err);
    }
  };

  return (
    <div>
      <form className="input-form" onSubmit={handleLogin}>
        <input
          placeholder="User Name"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        ></input>
        <input
          placeholder="Password"
          value={password}
          type="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        ></input>
        <button id="form-button"> Login </button>
      </form>
    </div>
  );
}

export { LoginForm };
