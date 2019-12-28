import { IState } from "../../interfaces/State";

export const getSelectedEmail = (state: IState) => state.email.selectedEmail;

export const getAllEmails = (state: IState) => state.email.emails

export const loadingAllEmailsSelector = (state: IState) => state.email.loadingEmails

export const loadingAllEmailsSuccessSelector = (state: IState) => state.email.allEmailLoaded;

export const loadingSelectedEmail = (state: IState) => state.email.loadingSelectedEmail