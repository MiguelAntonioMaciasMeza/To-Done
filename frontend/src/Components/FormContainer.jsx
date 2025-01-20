import { use, useState } from 'react';
import '../Styles/FormContainer.css';
import { LoginForm } from './LoginForm';
import { SignUpForm } from './SignupForm';
function FormContainer() {
  const [activeTab, setActiveTab] = useState('signin');

  return (
    <div className="form-container">
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
        {activeTab === 'signin' ? (
          <div className="active-tab">
            <div className="active-form">
              <LoginForm />
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
      <button>Reset Password</button>
    </div>
  );
}
export { FormContainer };
