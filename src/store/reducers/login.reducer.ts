import { ILoginState, IUser } from "../../interfaces/login.interface";
import {
  LOGIN_INIT,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT
} from "../actions/login.action";

export const initialState: ILoginState = {
  isAuthenticated: false,
  email: "",
  name: "",
  inProgress: false
};
const login = (state = initialState, action: any) => {
  switch (action.type) {
    case LOGIN_INIT: {
      // login request initiated
      return {
        ...state,
        inProgress: true
      };
    }
    case LOGIN_SUCCESS: {
      const payload: IUser = { ...action.payload };
      return {
        ...state,
        inProgress: false,
        isAuthenticated: true,
        email: payload.email
      };
    }
    case LOGIN_ERROR: {
      return {
        ...state,
        inProgress: false
      };
    }
    case LOGOUT: {
      return {
        ...state,
        isAuthenticated: false
      };
    }
    default: {
      return { ...state };
    }
  }
};

export default login;
