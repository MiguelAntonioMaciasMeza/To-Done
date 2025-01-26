import { use, useState } from 'react';
import '../../Styles/FormContainer.css';
import { LoginForm } from '../Auth/LoginForm';
import { SignUpForm } from '../Auth/SignupForm';
import { RequestPasswordReset } from '../Auth/RequestPasswordReset';
import { StatusMessage } from '../Views/StatusMessage';
function FormContainer({ onLogin }) {
  const [activeTab, setActiveTab] = useState('signin');
  const [resetPassword, setResetPassword] = useState();
  const [status, setStatus] = useState();
  const [message, setMessage] = useState();
  const handleStatus = (message, status) => {
    setMessage(message);
    setStatus(status);
  };
  const handleResetForm = (message) => {
    setResetPassword(message);
  };
  return (
    <div>
      <div
        className={
          resetPassword !== 'active'
            ? 'form-container'
            : 'form-container blurred'
        }
      >
        {/* Tabs for Sign In and Sign Up */}
        <div>
          <div className="tabs">
            <button
              className={activeTab === 'signin' ? 'active' : ''}
              onClick={() => setActiveTab('signin')}
            >
              Sign In
            </button>
            <button
              className={activeTab === 'signup' ? 'active' : ''}
              onClick={() => setActiveTab('signup')}
            >
              Sign Up
            </button>
          </div>

          {/*Only render the active tab */}
          {activeTab === 'signin' ? (
            <div>
              <div className="active-tab">
                <div className="active-form">
                  <LoginForm onSubmit={onLogin} onError={handleStatus} />
                </div>
              </div>
              <StatusMessage message={message} status={status} />
            </div>
          ) : (
            <div className="active-tab">
              <div className="active-form">
                <SignUpForm />
              </div>
            </div>
          )}
        </div>
        <p>Forgot your password?</p>
        <button
          id="reset-password-button"
          onClick={(event) => {
            setResetPassword('active');
            handleStatus('', '');
          }}
        >
          Reset Password
        </button>
      </div>
      {resetPassword === 'active' && (
        <div>
          <div>
            <RequestPasswordReset onExit={handleResetForm} />
          </div>
        </div>
      )}
    </div>
  );
}
export { FormContainer };
