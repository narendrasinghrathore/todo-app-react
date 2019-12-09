import { ADD_TODO, DELETE_TODO } from "../actions/todo.action";
import { ITodoListItem } from "../../interfaces/TodoListItem";
export interface TodoAppState {
  list: ITodoListItem[];
}

const data = [
  {
    id: "b77d409a-10cd-4a47-8e94-b0cd0ab50aa1",
    name: "Code-Splitting",
    content:
      "Most React apps will have their files “bundled” using tools like Webpack, Rollup or Browserify. Bundling is the process of following imported files and merging them into a single file: a “bundle”. This bundle can then be included on a webpage to load an entire app at once."
  },
  {
    id: "b77d409a-10cd-4a47-8e94-b0cd0ab50aa2",
    name: "Context",
    content:
      "In a typical React application, data is passed top-down (parent to child) via props, but this can be cumbersome for certain types of props (e.g. locale preference, UI theme) that are required by many components within an application. Context provides a way to share values like these between components without having to explicitly pass a prop through every level of the tree."
  }
];

const intialState: TodoAppState = {
  list: data
};

const todos = (state = intialState, action: any) => {
  switch (action.type) {
    case ADD_TODO: {
      const list = state.list;
      list.push(action.item as ITodoListItem);
      return { ...state, list };
    }

    case DELETE_TODO: {
      const list = state.list;
      const filteredList = list.filter(
        (item: ITodoListItem) => item.id !== (action.id as string)
      );
      return { ...state, list: filteredList };
    }

    default:
      return state;
  }
};
export default todos;
