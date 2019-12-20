import { IState } from "../../interfaces/State";

/**
 * Return inProgress i.e true or false
 * When we initiate login request
 * @param state @type IState
 */
export const loginProcessSelector = (state: IState) => state.login.inProgress;
/**
 * Return name of authenticated person i.e after successful login
 * @param state @type IState
 */
export const nameSelector = (state: IState) => state.login.name;
/**
 * Return email of authenticated person i.e after successful login
 * @param state @type IState
 */
export const emailSelector = (state: IState) => state.login.email;
/**
 * Return if user is authenticated i.e. true or false
 * @param state @type IState
 */
export const isAuthSelector = (state: IState) => state.login.isAuthenticated;
