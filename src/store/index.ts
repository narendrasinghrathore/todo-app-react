import { combineReducers } from "redux";
import todos from "./reducers/todo.reducer";
import { IState } from "../interfaces/State";

export default combineReducers<IState>({
  todos
});
