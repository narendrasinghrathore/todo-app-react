import { IState } from "../../interfaces/State";

/**
 * Get slice of selected todo from state
 * @param state selected todo of type iTodoListitem
 */
export const getSelectedTodoState = (state: IState) => state.todos.selectedTodo;
/**
 * Return list of todos
 * @param state @type IState
 */
export const getTodoList = (state: IState) => state.todos.list;
