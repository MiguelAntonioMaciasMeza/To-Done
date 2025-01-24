import '../Styles/Header.css';
import { FaCogs } from 'react-icons/fa';
function Header() {
  return (
    <div className="header">
      <div id="cogs">
        <FaCogs />
      </div>
      <div id="title">To-Done</div>
    </div>
  );
}

export { Header };
