import { ITodoListItem } from "../../interfaces/TodoListItem";

export const ACTION_NAME = "[TODO]: ";

export const ADD_TODO = `${ACTION_NAME} ADD_TODO`;
export const DELETE_TODO = `${ACTION_NAME} DELETE_TODO`;

export const AddTodo = (item: ITodoListItem) => ({
  type: ADD_TODO,
  item
});

export const DeleteTodo = (id: string) => ({
  type: DELETE_TODO,
  id
});
