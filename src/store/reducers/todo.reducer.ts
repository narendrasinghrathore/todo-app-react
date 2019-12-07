import { TodoActions, ADD_TODO } from "../actions/todo.action";

const intialState = {
    list: [],
    selected
}


const reducer = (state: any, action: TodoActions) => {
    switch (action) {
        case TodoActions.ADD_TODO:
            return { ...state };
        case TodoActions.DELETE_TODO:
            return { ...state };
        default:
            return { ...state };
    }

}