import { IEmailItem } from "./EmailItems";

export interface IEmailAppState {
    emails: IEmailItem[],
    selected: IEmailItem | undefined,
    loadingEmails: boolean,
    loadingSelectedEmail: boolean;
}