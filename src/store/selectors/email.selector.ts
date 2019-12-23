import { IState } from "../../interfaces/State";

export const getSelectedEmail = (state: IState) => state.email.selected

export const getAllEmails = (state: IState) => state.email.emails

export const loadingAllEmails = (state: IState) => state.email.loadingEmails

export const loadingSelectedEmail = (state: IState) => state.email.loadingSelectedEmail