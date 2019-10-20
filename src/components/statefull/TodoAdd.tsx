import React from "react";
import { ITodoListItem, ITodoAdd } from "../../interfaces/TodoListItem";

export class TodoAdd extends React.Component<ITodoAdd, ITodoListItem> {
  constructor(props: any) {
    super(props);
    this.state = {
      content: "",
      name: "",
      id: ""
    };
  }
  disableAddButton = () =>
    this.state.name.length > 0 && this.state.content.length > 0 ? false : true;

  /**
   * Handle form submit
   */
  handleFormSubmit = (event: any) => {
    let item = { ...this.state, id: Math.random().toString() };
    this.props.handleAddNewItem(item);
    event.preventDefault();
  };

  handleChange = (event: any) => {
    const target = event.target;
    const name = target.name;
    const value: string = target.value;

    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div>
        <input
          name="name"
          value={this.state.name}
          onChange={this.handleChange}
          type="text"
        />
        <input
          name="content"
          value={this.state.content}
          onChange={this.handleChange}
          type="text"
        />
        <button
          disabled={this.disableAddButton()}
          onClick={this.handleFormSubmit}
          type="button"
        >
          Add
        </button>
      </div>
    );
  }
}
