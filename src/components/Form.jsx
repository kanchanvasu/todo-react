import { useState } from "react";

function Form(props) {
  const [name, setName] = useState('');
  const [dueDate, setDueDate] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    props.addTask(name, dueDate);
    setName("");
    setDueDate("");
  }

  function handleChange(event) {
    setName(event.target.value);
  }

  function handleDateChange(event) {
    setDueDate(event.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done?
        </label>
      </h2>

      <input
        type="text"
        id="new-todo-input"
        aria-label="Add new todo"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleChange}
      />
      <label htmlFor="new-todo-due-date" className="label__lg">
        Due date
      </label>
      <input
        type="date"
        id="new-todo-due-date"
        className="input input__lg"
        name="dueDate"
        value={dueDate}
        onChange={handleDateChange}
      />
      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>
    </form>
  );
}

export default Form;
