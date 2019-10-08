export interface ITodoListItem {
    id?: string;
    name?: string;
    content?: string;
}
export interface ITodoAdd {
    item?: ITodoListItem,
    handleAddNewItem: Function;
}