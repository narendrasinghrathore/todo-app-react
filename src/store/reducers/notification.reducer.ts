import {
  SHOW_NOTIFICATION,
  HIDE_NOTIFICATION
} from "../actions/notification.action";
import { INotificationSnackbarPayload } from "../../interfaces/NotificationSnackbar";

const initialState: INotificationSnackbarPayload = {
  open: false,
  message: "",
  autohide: 2000
};

const notification = (state = initialState, action: any) => {
  switch (action.type) {
    case SHOW_NOTIFICATION: {
      return { ...state, ...action.payload };
    }
    case HIDE_NOTIFICATION: {
      return { ...state, ...initialState };
    }

    default:
      return state;
  }
};

export default notification;
