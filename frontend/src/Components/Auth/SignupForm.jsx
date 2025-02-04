import '../../Styles/Form.css';
import { useState } from 'react';
function SignUpForm() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const backendURL = process.env.REACT_APP_BACKEND_URL;

  const handlePasswordVerfication = (password, confirmPassword) => {
    console.log(password);
    console.log(confirmPassword);
    if (password !== confirmPassword) {
      return false;
    } else {
      return true;
    }
  };

  // Sign up function
  const handleSignup = async () => {
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
      if (res.status === 200) {
      } else if (res.status === 409) {
        const data = await res.json();
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault(); //Prevent page from reloading

    if (handlePasswordVerfication()) {
      handleSignup();
    } else {
      console.log('Passwords do no match;');
    }
  };
  return (
    <div>
      <form className="input-form" onSubmit={handleSubmit}>
        <input
          placeholder="User Name"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        ></input>
        <input
          placeholder="Email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        ></input>
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        ></input>
        <input
          placeholder="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(event) => {
            setConfirmPassword(event.target.value);
          }}
        />
        <button id="form-button" on>
          {' '}
          Create Account
        </button>
      </form>
    </div>
  );
}

export { SignUpForm };
