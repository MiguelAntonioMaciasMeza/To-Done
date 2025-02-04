import '../../Styles/SignOutButton.css';

function SignOutButton({ handleSignOut }) {
  return (
    <div className="sign-out-button">
      <button onClick={handleSignOut}> Sign Out</button>
    </div>
  );
}

export { SignOutButton };
