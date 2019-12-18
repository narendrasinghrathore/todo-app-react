import { ITodoList } from "../../../interfaces/TodoList";
import React, { useContext } from "react";
import { ITodoListItem } from "../../../interfaces/TodoListItem";
import { TodoListItem } from "../TodoListItem/TodoListItem";
import "./TodoListContainer.css";
import List from "@material-ui/core/List";
import { MyThemeContext } from "../../../context/ThemeManager";
export default function TodoListContainer(props: ITodoList) {
  /**
   * The contextType property on a class can be assigned a Context object created by React.createContext().
   * This lets you consume the nearest current value of that Context type using this.context.
   * You can reference this in any of the lifecycle methods including the render function.
   */
  const context = useContext(MyThemeContext);
  const theme = context;
  const len = props.list || [];
  const list: any[] | any =
    len.length === 0
      ? [<p className="no-item">No items in list</p>]
      : props!.list!.map((item: ITodoListItem) => {
          return (
            <TodoListItem
              key={item.id}
              id={item.id}
              name={item.name}
              content={item.content}
              color={theme.color}
              onRemoveItem={props.onRemoveItem}
            />
          );
        });
  return (
    <>
      <List classes={{ root: "list-container" }}>{list.reverse()}</List>
    </>
  );
}
