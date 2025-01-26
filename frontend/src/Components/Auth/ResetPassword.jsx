import { useState } from 'react';
import '../../Styles/FormContainer.css';
import '../../Styles/TextFields.css';
import { useSearchParams } from 'react-router-dom';
import { StatusMessage } from '../Views/StatusMessage';
function ResetPasswordForm() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const [params, setParams] = useSearchParams();

  const token = params.get('token');

  const handlePasswordReset = (event) => {
    event.preventDefault();
    if (newPassword === confirmPassword) {
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
