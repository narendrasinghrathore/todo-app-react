import { ITodoListItem } from "../../interfaces/TodoListItem";

export const ACTION_NAME = "[TODO]: ";

export const GET_TODO = `${ACTION_NAME} GET_TODO`;
export const ADD_TODO = `${ACTION_NAME} ADD_TODO`;
export const DELETE_TODO = `${ACTION_NAME} DELETE_TODO`;
export const REMOVE_SELECTED_TODO = `${ACTION_NAME} REMOVE_SELECTED_TODO`;

export const AddTodo = (item: ITodoListItem) => ({
  type: ADD_TODO,
  item
});

export const GetSelectedTodo = (id: string) => ({
  type: GET_TODO,
  id
});

export const RemoveSelectedTodo = () => ({
  type: REMOVE_SELECTED_TODO
});

export const DeleteTodo = (id: string) => ({
  type: DELETE_TODO,
  id
});
