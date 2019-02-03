import React from "react";
import PeopleListItem from "../PeopleListItem";

export default ({
  people,
  newPerson,
  handleOnChange,
  handleOnSubmit,
  handleOnDelete,
  handleOnUpdate
}) => (
  <div>
    <h3>Team Member</h3>
    <ul>
      {people
        .sort((a, b) => {
          return a.date - b.date;
        })
        .map((person, index) => (
          <PeopleListItem
            {...person}
            key={index}
            index={index}
            handleOnSave={handleOnUpdate}
            handleOnDelete={handleOnDelete}
          />
        ))}
    </ul>
    <h5>Add Team Member</h5>
    <form>
      <input
        type="text"
        name="name"
        value={newPerson.personName}
        onChange={handleOnChange}
      />
      <button
        type="submit"
        onClick={handleOnSubmit}
        disabled={newPerson.personName.trim() === ""}
      >
        Add
      </button>
    </form>
  </div>
);
