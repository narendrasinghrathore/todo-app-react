import { IUser } from "../../interfaces/login.interface";


const LOGIN = "[LOGIN COMPONENT] : ";
export const LOGIN_INIT = `${LOGIN} Login INIT`;
export const LOGIN_SUCCESS = `${LOGIN} Login SUCCESS`;
export const LOGIN_ERROR = `${LOGIN} Login ERROR`;
export const LOGOUT = `${LOGIN} Logout`;
export const loginRequestInit = (user: IUser) => ({
  type: LOGIN_INIT,
  user
});

export const loginRequestSuccess = (payload: any) => ({
  type: LOGIN_SUCCESS,
  payload
});

export const loginRequestError = (error: any) => ({
  type: LOGIN_ERROR,
  error
});

export const logoutRequest = () => ({
  type: LOGOUT
});

export const loginAction = (user: IUser, callback: Function) => {
  return (dispatch: any) => {
    dispatch(loginRequestInit(user));
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        dispatch(loginRequestSuccess({ ...user }));
        callback();
        resolve();
      }, 1500);
    });
  };
};
