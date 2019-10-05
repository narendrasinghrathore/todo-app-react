import { TodoList } from "../stateless/TodoList";
import React from "react";
import { ITodoListItem } from "../../interfaces/TodoListItem";

export class TodoHome extends React.Component {
  sameplDataList: ITodoListItem[] = [
    {
      id: 1,
      name: "Item 1"
    },
    {
      id: 2,
      name: "Item 2"
    }
  ];
  render() {
    return <TodoList list={this.sameplDataList} />;
  }
}
