import { useState } from 'react';
import '../../Styles/FormContainer.css';
import '../../Styles/TextFields.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StatusMessage } from '../Views/StatusMessage';
function ResetPasswordForm() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const token = params.get('token');
  const backendURL = process.env.REACT_BACKEND_URL;
  const handlePasswordReset = async (event) => {
    event.preventDefault();
    if (newPassword === confirmPassword) {
      const request = await fetch(`${backendURL}/api/resetPassword`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPassword),
        resetToken: JSON.stringify(token),
      });
      if (request.status === 200) {
        setMessage(
          'Password reset sucessfully. You will be redirected breifly',
        );
        setStatus('sucess');
        setTimeout(() => {
          navigate('/');
        }, 5000);
      } else {
        setMessage('There was an error, please try again.');
        setStatus('error');
      }
    } else {
      setMessage('Passwords do not match!');
      setStatus('error');
    }
  };
  return (
    <div className="form-container">
      <form className="active-tab" onSubmit={handlePasswordReset}>
        <input
          placeholder="New Password"
          type="password"
          value={newPassword}
          onChange={(event) => {
            setNewPassword(event.target.value);
          }}
        ></input>
        <input
          placeholder="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(event) => {
            setConfirmPassword(event.target.value);
          }}
        ></input>
        <StatusMessage message={message} status={status} />
        <button onSubmit={handlePasswordReset}>Change Password</button>
      </form>
    </div>
  );
}

export { ResetPasswordForm };
