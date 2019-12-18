import { TodoAppState } from "../store/reducers/todo.reducer";
import { IMusicResult } from "./MusicResult";
import { INotificationSnackbarPayload } from "./NotificationSnackbar";

export interface IState {
  todos: TodoAppState;
  music: IMusicResult;
  notification: INotificationSnackbarPayload;
}
