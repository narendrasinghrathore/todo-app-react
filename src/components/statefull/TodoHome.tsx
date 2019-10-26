import { TodoListContainer } from "../stateless/TodoList/TodoList";
import React from "react";
import { ITodoListItem } from "../../interfaces/TodoListItem";
import { TodoAdd } from "./TodoAdd";
import { ITodoHome } from "../../interfaces/TodoHome";
import { Dialog } from "../stateless/Dialog/Dialog";

export class TodoHome extends React.Component<{}, ITodoHome> {
  constructor(props: any) {
    super(props);
    this.state = {
      list: [
        {
          id: "b77d409a-10cd-4a47-8e94-b0cd0ab50aa1",
          name: "Item 1"
        },
        {
          id: "b77d409a-10cd-4a47-8e94-b0cd0ab50aa2",
          name: "Item 2"
        }
      ]
    };
  }

  onNewItem = (item: ITodoListItem) => {
    const list = this.state.list.concat([item]);
    this.setState({
      list
    });
  };
  render() {
    return (
      <div>
        <TodoAdd handleAddNewItem={this.onNewItem} />
        <TodoListContainer list={this.state.list} />
      </div>
    );
  }
}
