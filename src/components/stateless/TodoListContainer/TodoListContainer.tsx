import { ITodoList } from "../../../interfaces/TodoList";
import React from "react";
import { ITodoListItem } from "../../../interfaces/TodoListItem";
import { TodoListItem } from "../TodoListItem/TodoListItem";
import "./TodoListContainer.css";
import List from "@material-ui/core/List";
export class TodoListContainer extends React.Component<ITodoList> {
  render() {
    let list;
    const len = this.props.list || [];
    if (len.length === 0) {
      list = <p>No items in list</p>;
    } else {
      list = this.props.list
        .map((item: ITodoListItem, index: number) => {
          return (
            <TodoListItem
              key={item.id}
              id={item.id}
              name={item.name}
              content={item.content}
              onRemoveItem={this.props.onRemoveItem}
            />
          );
        })
        .reverse();
    }

    return <List classes={{ root: "list-container" }}>{list}</List>;
  }
}
