import React, { Component } from "react";
import PeopleList from "./components/PeopleList";
import "./App.css";
import TaskList from "./components/TaskList";

class App extends Component {
  state = {
    people: [
      { personName: "Rathaniel", date: 1549147211785 },
      { personName: "Rock", date: 1549147739723 },
      { personName: "Balls", date: 1549147742979 }
    ],
    tasks: [
      {
        taskName: "Remake Bootstrap",
        assignee: "Balls",
        completed: false,
        date: 1549147211785
      },
      {
        taskName: "Create React App",
        assignee: "Balls",
        completed: false,
        date: 1549147739723
      },
      {
        taskName: "Run every program",
        assignee: "Balls",
        completed: false,
        date: 1549147742979
      }
    ],
    newPerson: { personName: "", date: null },
    newTask: { taskName: "", assignee: "", completed: false, date: null }
  };

  handleTaskOnChange = event => {
    this.setState({
      newTask: {
        ...this.state.newTask,
        taskName: event.target.value
      }
    });
  };

  handleTaskAssigneeOnChange = event => {
    this.setState({
      newTask: {
        ...this.state.newTask,
        assignee: event.target.value
      }
    });
  };

  // get current list of tasks, (...this.state.tasks)
  // remove the one we're updating, (filter based on the index of the task we clicked)
  // get the task we changed
  // update the state for the task we changed,
  // and add it back
  handleTaskCompletedOnChange = (event, eventIndex) => {
    const theTaskInStateThatWeWantToChange = this.state.tasks[eventIndex];

    theTaskInStateThatWeWantToChange.completed = !theTaskInStateThatWeWantToChange.completed;

    this.setState({
      tasks: [
        ...this.state.tasks.filter((task, i) => i !== eventIndex),
        theTaskInStateThatWeWantToChange
      ]
    });
  };

  handleNameOnChange = event => {
    this.setState({
      newPerson: {
        ...this.state.newPerson,
        personName: event.target.value
      }
    });
  };

  handleTaskOnDelete = eventIndex => {
    this.setState({
      tasks: [
        ...this.state.tasks.filter(
          (task, loopIndex) => loopIndex !== eventIndex
        )
      ]
    });
  };

  handlePersonOnDelete = eventIndex => {
    const deletedName = this.state.people[eventIndex].personName;

    this.setState({
      people: [
        ...this.state.people.filter(
          (person, loopIndex) => loopIndex !== eventIndex
        )
      ],
      tasks: this.state.tasks.map(task => {
        if (task.assignee === deletedName) {
          task.assignee = "";
        }
        return task;
      })
    });
  };

  handleTaskOnUpdate = (eventIndex, editedTask) => {
    let theTaskInStateThatWeWantToUpdate = this.state.tasks[eventIndex];

    theTaskInStateThatWeWantToUpdate = editedTask;

    this.setState({
      tasks: [
        ...this.state.tasks.filter((task, i) => i !== eventIndex),
        theTaskInStateThatWeWantToUpdate
      ]
    });
  };

  handlePersonOnUpdate = (eventIndex, editedPerson) => {
    let thePersonInStateThatWeWantToUpdate = this.state.people[eventIndex];
    const originalName = thePersonInStateThatWeWantToUpdate.personName;

    thePersonInStateThatWeWantToUpdate = editedPerson;

    this.setState({
      people: [
        ...this.state.people.filter((person, i) => i !== eventIndex),
        thePersonInStateThatWeWantToUpdate
      ],
      tasks: this.state.tasks.map(task => {
        if (task.assignee === originalName) {
          task.assignee = editedPerson.personName;
        }
        return task;
      })
    });
  };

  handleNameOnSubmit = event => {
    event.preventDefault();

    if (this.state.newPerson.personName.trim() === "") {
      return;
    }

    const newPerson = { ...this.state.newPerson };

    newPerson.date = Date.now();

    this.setState({
      people: [...this.state.people, newPerson],
      newPerson: { personName: "", date: null }
    });
  };

  handleTaskOnSubmit = event => {
    event.preventDefault();

    if (this.state.newTask.taskName.trim() === "") {
      return;
    }

    const newTask = { ...this.state.newTask };

    newTask.date = Date.now();

    this.setState({
      tasks: [...this.state.tasks, newTask],
      newTask: { taskName: "", assignee: "", completed: false, date: null }
    });
  };

  render() {
    return (
      <div className="App">
        <PeopleList
          handleOnSubmit={this.handleNameOnSubmit}
          handleOnChange={this.handleNameOnChange}
          handleOnUpdate={this.handlePersonOnUpdate}
          handleOnDelete={this.handlePersonOnDelete}
          people={this.state.people}
          newPerson={this.state.newPerson}
        />
        <hr />
        <TaskList
          handleOnUpdate={this.handleTaskOnUpdate}
          handleOnDelete={this.handleTaskOnDelete}
          handleCompletedOnChange={this.handleTaskCompletedOnChange}
          handleAssigneeOnChange={this.handleTaskAssigneeOnChange}
          handleOnSubmit={this.handleTaskOnSubmit}
          handleOnChange={this.handleTaskOnChange}
          people={this.state.people}
          tasks={this.state.tasks}
          newTask={this.state.newTask}
        />
      </div>
    );
  }
}

export default App;
