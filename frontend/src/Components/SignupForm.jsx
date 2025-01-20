import '../Styles/Form.css';
function SignUpForm() {
  return (
    <div>
      <form className="input-form">
        <input placeholder="User Name"></input>
        <input placeholder="Email"></input>
        <input placeholder="Password"></input>
        <input placeholder="Confirm Password"></input>
        <button id="form-button"> Create Account</button>
      </form>
    </div>
  );
}

export { SignUpForm };
