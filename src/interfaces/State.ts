import { TodoAppState } from "../store/reducers/todo.reducer";
import { IMusicResult } from "./MusicResult";

export interface IState {
  todos: TodoAppState;
  music: IMusicResult;
}
