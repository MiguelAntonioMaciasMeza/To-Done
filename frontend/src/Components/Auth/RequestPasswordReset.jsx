import '../../Styles/ResetPassword.css';
import { useState } from 'react';
import { StatusMessage } from '../Views/StatusMessage';
function RequestPasswordReset({ onExit }) {
  const [email, setEmail] = useState();
  const [isVisible, setVisible] = useState(true);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState();
  const handleForm = () => {
    setVisible('');
    onExit('');
  };

  const backendURL = process.env.REACT_APP_BACKEND_URL;
  //Request a reset password token with the use of the user's email.
  const requestToken = async (event) => {
    event.preventDefault();
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
        setMessage('Check email for reset link.');
        setStatus('success');
      } else if (response.status === 404) {
        setMessage('Email not found');
        setStatus('error');
      }
    } catch (error) {}
  };
  return (
    <div className={`reset-password-container ${isVisible ? 'visible' : ''}`}>
      <div className="reset-header">
        Please enter your email.{' '}
        <button className="reset-header button" onClick={handleForm}>
          x
        </button>
      </div>
      <form onSubmit={requestToken}>
        <input
          placeholder="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <button>Reset Password</button>
      </form>
      <StatusMessage message={message} status={status} />
    </div>
  );
}

export { RequestPasswordReset };
