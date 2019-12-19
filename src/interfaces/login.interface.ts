export interface IUser {
  email: string;
  password: string;
}

export interface ILoginState {
  name: string;
  email: string;
  isAuthenticated: boolean;
  inProgress: boolean;
}
