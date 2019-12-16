import { combineReducers } from "redux";
import todos from "./reducers/todo.reducer";
import music from "./reducers/music.reducer";
import { IState } from "../interfaces/State";

export default combineReducers<IState>({
  todos,
  music
});
