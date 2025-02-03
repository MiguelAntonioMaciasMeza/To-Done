import '../../Styles/Header.css';
import { SignOutButton } from './SignOutButton';
function Header({ loggedIn }) {
  const handleSignOut = () => {};
  return (
    <div className="header">
      <div id="title">To-Done</div>
      {loggedIn && <SignOutButton onSignOut={handleSignOut} />}
    </div>
  );
}

export { Header };
