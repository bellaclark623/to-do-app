import React, { Component, Fragment } from "react";

export default class TaskListItem extends Component {
  state = {
    editMode: false,
    editedTask: {
      taskName: this.props.taskName,
      assignee: this.props.assignee,
      completed: this.props.completed,
      date: this.props.date
    }
  };

  componentWillReceiveProps(newProps) {
    if (newProps.assignee !== this.state.editedTask.assignee) {
      this.setState({
        editedTask: {
          ...this.state.editedTask,
          assignee: newProps.assignee
        }
      });
    }
    if (newProps.taskName !== this.state.editedTask.taskName) {
      this.setState({
        editedTask: {
          ...this.state.editedTask,
          taskName: newProps.taskName
        }
      });
    }
    if (newProps.completed !== this.state.editedTask.completed) {
      this.setState({
        editedTask: {
          ...this.state.editedTask,
          completed: newProps.completed
        }
      });
    }
  }

  toggleEditMode = () => {
    this.setState({
      editMode: !this.state.editMode
    });
  };

  handleCancelEditOnClick = event => {
    this.toggleEditMode();
    this.setState({
      editedTask: {
        taskName: this.props.taskName,
        assignee: this.props.assignee,
        completed: this.props.completed
      }
    });
  };

  handleTaskNameOnChange = event => {
    this.setState({
      editedTask: {
        ...this.state.editedTask,
        taskName: event.target.value
      }
    });
  };

  handleAssigneeOnChange = event => {
    this.setState({
      editedTask: {
        ...this.state.editedTask,
        assignee: event.target.value
      }
    });
  };

  handleSaveOnClick = event => {
    if (this.state.editedTask.taskName.trim() === "") {
      return;
    }

    this.props.handleOnSave(this.props.index, this.state.editedTask);
    this.toggleEditMode();
  };

  _renderTaskName() {
    if (this.state.editMode) {
      return (
        <input
          type="text"
          name="task"
          value={this.state.editedTask.taskName}
          onChange={this.handleTaskNameOnChange}
        />
      );
    }
    return <span>{this.props.taskName}</span>;
  }

  _renderAssignee() {
    if (this.state.editMode) {
      return (
        <select
          title={
            !!!this.props.people.length
              ? "Add a person using the form above in order to assign this task to someone."
              : ""
          }
          type="text"
          value={this.state.editedTask.assignee}
          name="name"
          onChange={this.handleAssigneeOnChange}
          disabled={!!!this.props.people.length}
        >
          <option value="">Assign to...</option>
          {this.props.people.map((person, index) => (
            <option key={index}>{person.personName}</option>
          ))}
        </select>
      );
    }
    return this.props.assignee && <span>&nbsp;({this.props.assignee})</span>;
  }

  _renderActions() {
    if (this.state.editMode) {
      return (
        <Fragment>
          <button
            onClick={this.handleSaveOnClick}
            disabled={this.state.editedTask.taskName.trim() === ""}
          >
            Save
          </button>
          <button onClick={this.handleCancelEditOnClick}>Cancel</button>
        </Fragment>
      );
    }
    return (
      <Fragment>
        <button onClick={this.toggleEditMode}>Edit</button>
        <button onClick={() => this.props.handleOnDelete(this.props.index)}>
          Delete
        </button>
      </Fragment>
    );
  }

  render() {
    return (
      <li>
        <input
          type="checkbox"
          name="completed"
          checked={this.props.completed}
          onChange={event =>
            this.props.handleCompletedOnChange(event, this.props.index)
          }
        />
        &nbsp;
        {this._renderTaskName()}
        {this._renderAssignee()}
        &nbsp;
        {this._renderActions()}
      </li>
    );
  }
}
