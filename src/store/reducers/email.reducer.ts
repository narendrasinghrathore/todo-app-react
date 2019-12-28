import { IEmailAppState } from "../../interfaces/EmailAppState";
import { LOAD_EMAILS_SUCCESS, LOAD_EMAILS_FAIL, LOAD_EMAILS, LOAD_SELECTED_EMAIL } from "../actions/email.action";

const initialState: IEmailAppState = {
    emails: [],
    loadingEmails: false,
    loadingSelectedEmail: false,
    allEmailLoaded: false,
    selected: undefined
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
                allEmailLoaded:true

            }

        }
        case LOAD_EMAILS_FAIL: {
            return {
                ...state,
                loadingEmails: false,
            }

        }
        case LOAD_SELECTED_EMAIL: {
            const selected = state.emails.find(item => item.id === action.id);
            return {
                ...state,
                selected
            }
        }
        default:
            return state;
    }
}
export default email;