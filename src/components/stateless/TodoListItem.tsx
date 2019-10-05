import React from "react";
import { ITodoListItem } from "../../interfaces/TodoListItem";

export class TodoListItem extends React.Component<ITodoListItem> {
  render() {
    return <li>{this.props.name}</li>;
  }
}
