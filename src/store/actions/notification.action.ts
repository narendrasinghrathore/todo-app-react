import { INotificationSnackbarPayload } from "../../interfaces/NotificationSnackbar";
/**
 * CONST SHOW NOTFICATION 
 */
export const SHOW_NOTIFICATION = "[APP NOTIFICATION] SHOW";
/**
 * CONST HIDE NOTFICATION 
 */
export const HIDE_NOTIFICATION = "[APP NOTIFICATION] HIDE";
/**
 * Call action to show app notification
 * @param payload @type INotificationSnackbarPayload
 */
export const showNotificationAction = (
  payload: INotificationSnackbarPayload
) => ({
  type: SHOW_NOTIFICATION,
  payload
});

/**
 * Action called by component only, notifying
 * that notification is hide
 */
export const hideNotificationAction = () => ({
  type: HIDE_NOTIFICATION
});
