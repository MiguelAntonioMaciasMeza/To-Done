import '../../Styles/Header.css';
import { SignOutButton } from './SignOutButton';
function Header({ loggedIn, onSignOut }) {
  return (
    <div className="header">
      <div id="title">To-Done</div>
      {loggedIn && <SignOutButton handleSignOut={onSignOut} />}
    </div>
  );
}

export { Header };
