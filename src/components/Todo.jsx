import { useEffect, useRef, useState } from "react";

function usePrevious(value) {
  const ref = useRef(null);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const TODAY = new Date().toISOString().split('T')[0];

function formatDate(dateStr) {
  if (!dateStr) return null;
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function Todo(props) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDueDate, setNewDueDate] = useState("");

  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);

  const wasEditing = usePrevious(isEditing);

  function handleChange(event) {
    setNewName(event.target.value);
  }

  function handleDateChange(event) {
    setNewDueDate(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.editTask(props.id, newName, newDueDate);
    setNewName("");
    setNewDueDate("");
    setEditing(false);
  }

  const isOverdue = props.dueDate && props.dueDate < TODAY && !props.completed;

  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={props.id}>
          New name for {props.name}
        </label>
        <input
          id={props.id}
          className="todo-text"
          type="text"
          value={newName}
          onChange={handleChange}
          ref={editFieldRef}
        />
      </div>
      <div className="form-group">
        <label className="todo-label" htmlFor={`${props.id}-due-date`}>
          Due date
        </label>
        <input
          id={`${props.id}-due-date`}
          className="todo-text"
          type="date"
          value={newDueDate}
          onChange={handleDateChange}
        />
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn todo-cancel"
          onClick={() => setEditing(false)}>
          Cancel
          <span className="visually-hidden">renaming {props.name}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          Save
          <span className="visually-hidden">new name for {props.name}</span>
        </button>
      </div>
    </form>
  );

  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input
          id={props.id}
          type="checkbox"
          defaultChecked={props.completed}
          aria-label={`${props.completed ? "Mark incomplete" : "Mark complete"}: ${props.name}`}
          onChange={() => props.toggleTaskCompleted(props.id)}
        />
        <label className="todo-label" htmlFor={props.id}>
          {props.name}
        </label>
      </div>
      {props.dueDate && (
        <p style={{ color: isOverdue ? 'red' : undefined, margin: '0.25rem 0' }}>
          Due: {formatDate(props.dueDate)}
        </p>
      )}
      <div className="btn-group">
        <button
          type="button"
          className="btn"
          aria-label={`Edit ${props.name}`}
          onClick={() => {
            setNewName(props.name);
            setNewDueDate(props.dueDate || "");
            setEditing(true);
          }}
          ref={editButtonRef}>
          Edit <span className="visually-hidden">{props.name}</span>
        </button>
        <button
          type="button"
          className="btn btn__danger"
          aria-label={`Delete ${props.name}`}
          onClick={() => props.deleteTask(props.id)}>
          Delete <span className="visually-hidden">{props.name}</span>
        </button>
      </div>
    </div>
  );

  useEffect(() => {
    if (!wasEditing && isEditing) {
      editFieldRef.current.focus();
    } else if (wasEditing && !isEditing) {
      editButtonRef.current.focus();
    }
  }, [wasEditing, isEditing]);

  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
}

export default Todo;
