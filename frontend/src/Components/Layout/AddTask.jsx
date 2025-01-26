import '../../Styles/Tasks.css';
function AddTask() {
  return (
    <div className="add-task">
      <form>
        <input placeholder="Task" />
        <button>Create a Task</button>
      </form>
    </div>
  );
}

export { AddTask };
