import React, { Component, Fragment } from "react";

export default class PersonListItem extends Component {
  state = {
    editMode: false,
    editedPerson: {
      personName: this.props.personName,
      date: this.props.date
    }
  };

  componentWillReceiveProps(newProps) {
    if (newProps.personName !== this.state.editedPerson.personName) {
      this.setState({
        editedPerson: {
          ...this.state.editedPerson,
          personName: newProps.personName
        }
      });
    }
  }

  toggleEditMode() {
    this.setState({
      editMode: !this.state.editMode
    });
  }

  _renderPersonName() {
    const { personName } = this.props;

    if (this.state.editMode) {
      // render input
      return (
        <input
          type="text"
          name="person"
          value={this.state.editedPerson.personName}
          onChange={this.handlePersonNameOnChange}
        />
      );
    }

    return personName;
  }

  handleCancelOnClick = () => {
    this.toggleEditMode();

    this.setState({
      editedPerson: {
        personName: this.props.personName
      }
    });
  };

  handleSaveOnClick = () => {
    if (this.state.editedPerson.personName.trim() === "") {
      return;
    }

    this.props.handleOnSave(this.props.index, this.state.editedPerson);
    this.toggleEditMode();
  };

  handleEditOnClick = () => {
    this.setState({
      editMode: true
    });
  };

  handlePersonNameOnChange = event => {
    this.setState({
      editedPerson: {
        ...this.state.editedPerson,
        personName: event.target.value
      }
    });
  };

  _renderActions() {
    if (this.state.editMode) {
      return (
        <Fragment>
          <button onClick={this.handleCancelOnClick}>Cancel</button>
          <button
            onClick={this.handleSaveOnClick}
            disabled={this.state.editedPerson.personName.trim() === ""}
          >
            Save
          </button>
        </Fragment>
      );
    }

    return (
      <Fragment>
        <button onClick={this.handleEditOnClick}>Edit</button>
        <button onClick={() => this.props.handleOnDelete(this.props.index)}>
          Delete
        </button>
      </Fragment>
    );
  }

  render() {
    // add edit button, cancel button, save button, delete button
    return (
      <li>
        {this._renderPersonName()}
        &nbsp;
        {this._renderActions()}
      </li>
    );
  }
}
