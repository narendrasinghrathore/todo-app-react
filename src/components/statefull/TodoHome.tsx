import { TodoListContainer } from "../stateless/TodoListContainer/TodoListContainer";
import React from "react";
import { ITodoListItem } from "../../interfaces/TodoListItem";
import { TodoAdd } from "./TodoAdd";
import { ITodoHome } from "../../interfaces/TodoHome";

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
  onRemoveItem = (id: string) => {
    const list = this.state.list.filter(
      (item: ITodoListItem) => item.id !== id
    );
    this.setState({
      list
    });
  };
  render() {
    return (
      <div>
        <TodoAdd handleAddNewItem={this.onNewItem} />
        <TodoListContainer
          onRemoveItem={this.onRemoveItem}
          list={this.state.list}
        />
      </div>
    );
  }
}
