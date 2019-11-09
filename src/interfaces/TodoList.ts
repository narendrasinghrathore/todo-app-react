import { ITodoListItem } from "./TodoListItem";

export interface ITodoList {
    list?: ITodoListItem[];
    onRemoveItem?: Function;
}