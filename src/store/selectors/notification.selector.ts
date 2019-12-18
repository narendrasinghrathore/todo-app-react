import { IState } from "../../interfaces/State";

/**
 * Return message, that passed by calling action
 * showNotificationAction
 * @param state @type IState
 */
export const getNotificationMessage = (state: IState) =>
  state.notification.message;
/**
 * Return state of snackbar i.e. true or false
 * If true, open, to hide we use autohide in milliseconds
 * @param state @type IState
 */
export const getNotificationOpenStatus = (state: IState) =>
  state.notification.open;
/**
 * Return autohide i.e. milliseconds for use in notification
 * component only
 * @param state @type IState
 */
export const getNotificationAutoHide = (state: IState) =>
  state.notification.autohide;
