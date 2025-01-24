import '../Styles/ResetPassword.css';
import { useState } from 'react';
function ResetPasswordForm({ onExit }) {
  const [email, setEmail] = useState();
  const [isVisible, setVisible] = useState(true);
  const handleForm = () => {
    setVisible('');
    onExit('');
  };

  const backendURL = process.env.REACT_APP_BACKEND_URL;
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
      } else if (response.status === 404) {
      }
    } catch (error) {}
  }
  return (
    <div className={`reset-password-container ${isVisible ? 'visible' : ''}`}>
      <div className="reset-header">
        Please enter your email.{' '}
        <button className="reset-header button" onClick={handleForm}>
          x
        </button>
      </div>
      <form>
        <input
          placeholder="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <button>Reset Password</button>
      </form>
    </div>
  );
}

export { ResetPasswordForm };
