import React from "react";
import TaskListItem from "../TaskListItem";

export default ({
  newTask,
  handleOnChange,
  handleOnSubmit,
  tasks,
  people,
  handleAssigneeOnChange,
  handleCompletedOnChange,
  handleOnDelete,
  handleOnUpdate
}) => (
  <div>
    <h3>Task List</h3>
    <ul>
      {tasks
        .sort((a, b) => {
          return a.date - b.date;
        })
        .map((task, index) => (
          <TaskListItem
            key={index}
            index={index}
            people={people}
            handleOnSave={handleOnUpdate}
            handleAssigneeOnChange={handleAssigneeOnChange}
            handleOnDelete={handleOnDelete}
            handleCompletedOnChange={handleCompletedOnChange}
            {...task}
          />
        ))}
    </ul>
    <h5>Add Task</h5>
    <form>
      <input
        type="text"
        name="task"
        value={newTask.taskName}
        onChange={handleOnChange}
      />
      <select
        type="text"
        value={newTask.assignee}
        name="name"
        onChange={handleAssigneeOnChange}
      >
        <option value="">Assign To...</option>
        {people.map((person, index) => (
          <option key={index}>{person.personName}</option>
        ))}
      </select>
      <button
        type="submit"
        onClick={handleOnSubmit}
        disabled={newTask.taskName.trim() === ""}
      >
        Assign
      </button>
    </form>
  </div>
);
