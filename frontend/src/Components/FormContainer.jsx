import { use, useState } from 'react';
import '../Styles/FormContainer.css';
import { LoginForm } from './LoginForm';
import { SignUpForm } from './SignupForm';
import { ResetPasswordForm } from './ResetPasswordForm';
function FormContainer({ onLogin }) {
  const [activeTab, setActiveTab] = useState('signin');
  const [resetPassword, setResetPassword] = useState();
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
            <div className="active-tab">
              <div className="active-form">
                <LoginForm onSubmit={onLogin} />
              </div>
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
          }}
        >
          Reset Password
        </button>
      </div>
      {resetPassword === 'active' && (
        <div>
          <ResetPasswordForm onExit={handleResetForm} />
        </div>
      )}
    </div>
  );
}
export { FormContainer };
