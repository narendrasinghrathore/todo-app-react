import { ITodoListItem } from "../../interfaces/TodoListItem";

export const ACTION_NAME = "[TODO]: ";
export const ADD_TODO = `${ACTION_NAME} ADD_TODO`;
export const DELETE_TODO = `${ACTION_NAME} DELETE_TODO`;


export const addTodo = (content: ITodoListItem) => ({
    type: ADD_TODO,
    payload: {
        ...content
    }
});


export const deleteTodo = (id: number) => ({
    type: DELETE_TODO,
    payload: id
});

export enum TodoActions {
    ADD_TODO,
    DELETE_TODO
}
