import { ITodoListItem } from "./TodoListItem";

export interface IState {
  todos: {
    list: ITodoListItem[];
  };
}
