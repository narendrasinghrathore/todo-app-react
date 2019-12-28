import { IEmailAppState } from "../../interfaces/EmailAppState";
import { LOAD_EMAILS_SUCCESS, LOAD_EMAILS_FAIL, LOAD_EMAILS, LOAD_SELECTED_EMAIL, LOAD_SELECTED_EMAIL_FAIL, LOAD_SELECTED_EMAIL_SUCCESS } from "../actions/email.action";

const initialState: IEmailAppState = {
    emails: [],
    loadingEmails: false,
    loadingSelectedEmail: false,
    allEmailLoaded: false,
    selectedEmail: undefined
}

const email = (state = initialState, action: any) => {
    switch (action.type) {

        case LOAD_EMAILS: {
            return {
                ...state,
                loadingEmails: true,
                allEmailLoaded: false
            }

        }
        case LOAD_EMAILS_SUCCESS: {
            return {
                ...state,
                emails: [...action.data],
                loadingEmails: false,
                allEmailLoaded: true

            }

        }
        case LOAD_EMAILS_FAIL: {
            return {
                ...state,
                loadingEmails: false,
            }

        }
        case LOAD_SELECTED_EMAIL: {
            return {
                ...state,
                loadingSelectedEmail: true
            }
        }
        case LOAD_SELECTED_EMAIL_SUCCESS: {
            const selectedEmail = { ...action.item };
            return {
                ...state,
                loadingSelectedEmail: false,
                selectedEmail
            }
        }
        case LOAD_SELECTED_EMAIL_FAIL: {
            return {
                ...state,
                loadingSelectedEmail: false,
                selectedEmail: undefined
            }
        }
        default:
            return state;
    }
}
export default email;