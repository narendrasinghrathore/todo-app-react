import { IEmailItem } from "./EmailItems";

export interface IEmailAppState {
    emails: IEmailItem[],
    selectedEmail: IEmailItem | undefined,
    loadingEmails: boolean,
    loadingSelectedEmail: boolean;
    allEmailLoaded: boolean;
}