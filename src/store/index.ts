import { combineReducers } from "redux";
import todos from "./reducers/todo.reducer";
import music from "./reducers/music.reducer";
import { IState } from "../interfaces/State";
import notification from "./reducers/notification.reducer";
import login from "./reducers/login.reducer";
import email from './reducers/email.reducer';
export default combineReducers<IState>({
  todos,
  music,
  notification,
  login,
  email
});
