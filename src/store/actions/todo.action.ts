import { ITodoListItem } from "../../interfaces/TodoListItem";
import { StoreActions } from "../../interfaces/Actions";

export const ACTION_NAME = "[TODO]: ";

export const ADD_TODO = `${ACTION_NAME} ADD_TODO`;
export const DELETE_TODO = `${ACTION_NAME} DELETE_TODO`;


export class AddTodo implements StoreActions {
    readonly type = ADD_TODO;
    constructor(public payload: ITodoListItem) { }
}


export class DeleteTodo implements StoreActions {
    readonly type = DELETE_TODO;
    constructor(public payload: number) { }
}

export type TodoActions = AddTodo | DeleteTodo;
