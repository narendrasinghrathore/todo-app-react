import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { useDispatch, useSelector } from "react-redux";
import { hideNotificationAction } from "../../../store/actions/notification.action";
import {
  getNotificationAutoHide,
  getNotificationMessage,
  getNotificationOpenStatus
} from "../../../store/selectors/notification.selector";
import { IState } from "../../../interfaces/State";
/**
 * To show any notification through application, use NavigationSnackbar
 * component. Use redux store to perform actions.
 * Below are action, you can plugin you logic in component.
 * 1)
 * @param props @type INavigationSnackbar
 */
export default function NotificationSnackbar() {
  const dispatch = useDispatch();

  /**
   * Get boolean from state
   */
  const open = useSelector((state: IState) => getNotificationOpenStatus(state));
  /**
   * Get autohide number from state
   */
  const autohide = useSelector((state: IState) =>
    getNotificationAutoHide(state)
  );
  /**
   * Get message from state
   */
  const message = useSelector((state: IState) => getNotificationMessage(state));

  const onHide = () => {
    dispatch(hideNotificationAction());
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={open}
        autoHideDuration={autohide}
        onClose={onHide}
        ContentProps={{
          "aria-describedby": "app-notification"
        }}
        message={<span id="app-notification">{message}</span>}
      />
    </>
  );
}
