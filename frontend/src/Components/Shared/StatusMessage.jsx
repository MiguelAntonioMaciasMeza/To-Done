import '../../Styles/StatusMessage.css';
function StatusMessage({ message, status }) {
  return <div className={`status-message-container ${status}`}>{message}</div>;
}

export { StatusMessage };
