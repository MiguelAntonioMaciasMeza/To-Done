import '../Styles/Form.css';
function LoginForm() {
  return (
    <div>
      <form className="input-form">
        <input placeholder="User Name"></input>
        <input placeholder="Password"></input>
        <button id="form-button"> Login </button>
      </form>
    </div>
  );
}

export { LoginForm };
