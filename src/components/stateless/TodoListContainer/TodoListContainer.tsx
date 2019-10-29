import { ITodoList } from "../../../interfaces/TodoList";
import React from "react";
import { ITodoListItem } from "../../../interfaces/TodoListItem";
import { TodoListItem } from "../TodoListItem/TodoListItem";
import "./TodoListContainer.css";
import List from "@material-ui/core/List";
import { MyThemeContext } from "../../../context/ThemeManager";
import { IThemes } from "../../../interfaces/Themes";
export class TodoListContainer extends React.Component<ITodoList> {
  /**
   * The contextType property on a class can be assigned a Context object created by React.createContext().
   * This lets you consume the nearest current value of that Context type using this.context.
   * You can reference this in any of the lifecycle methods including the render function.
   */
  static contextType = MyThemeContext;

  render = () => {
    let theme: IThemes = this.context;
    let list;
    const len = this.props.list || [];
    if (len.length === 0) {
      list = <p className="no-item">No items in list</p>;
    } else {
      list = this.props.list
        .map((item: ITodoListItem, index: number) => {
          return (
            <TodoListItem
              key={item.id}
              id={item.id}
              name={item.name}
              content={item.content}
              color={theme.color}
              onRemoveItem={this.props.onRemoveItem}
            />
          );
        })
        .reverse();
    }

    return <List classes={{ root: "list-container" }}>{list}</List>;
  };
}
