import { IEmailItem } from "../../interfaces/EmailItems";

export const EMAIL = "[EMAIL]";

export const LOAD_EMAILS = `${EMAIL} LOADING EMAILS`;

export const LOAD_EMAILS_SUCCESS = `${EMAIL} LOADING EMAILS SUCCESS`;

export const LOAD_EMAILS_FAIL = `${EMAIL} LOADING EMAILS FAIL`;

export const LOAD_SELECTED_EMAIL = `${EMAIL} LOADING SELECTED EMAIL`;
export const LOAD_SELECTED_EMAIL_SUCCESS = `${EMAIL} LOADING SELECTED EMAIL SUCCESS`;
export const LOAD_SELECTED_EMAIL_FAIL = `${EMAIL} LOADING SELECTED EMAIL FAIL`;

export const loadingEmails = () => ({
  type: LOAD_EMAILS
});

export const loadingEmailSuccess = (data: IEmailItem[]) => ({
  type: LOAD_EMAILS_SUCCESS,
  data
});

export const loadEmailFail = (error: any) => ({
  type: LOAD_EMAILS_FAIL,
  error
});

export const loadSelecteEmail = (id: string | number) => ({
  type: LOAD_SELECTED_EMAIL,
  id
});
export const loadSelecteEmailSuccessAction = (item: IEmailItem) => ({
  type: LOAD_SELECTED_EMAIL_SUCCESS,
  item
});
export const loadSelectedEmailFailAction = () => ({
  type: LOAD_SELECTED_EMAIL_FAIL
});


const list: IEmailItem[] = [
  {
    id: "1",
    subject: "accusamus beatae ad facilis cum similique qui sunt",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    avatar: "https://via.placeholder.com/150/92c952"
  },
  {
    id: "2",
    subject: "reprehenderit est deserunt velit ipsam",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    avatar: "https://via.placeholder.com/150/771796"
  },
  {
    id: "3",
    subject: "officia porro iure quia iusto qui ipsa ut modi",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    avatar: "https://via.placeholder.com/150/24f355"
  },
  {
    id: "4",
    subject: "culpa odio esse rerum omnis laboriosam voluptate repudiandae",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    avatar: "https://via.placeholder.com/150/d32776"
  },
  {
    id: "5",
    subject: "natus nisi omnis corporis facere molestiae rerum in",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    avatar: "https://via.placeholder.com/150/f66b97"
  },
  {
    id: "6",
    subject: "accusamus ea aliquid et amet sequi nemo",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    avatar: "https://via.placeholder.com/150/56a8c2"
  },
  {
    id: "7",
    subject: "officia delectus consequatur vero aut veniam explicabo molestias",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    avatar: "https://via.placeholder.com/150/b0f7cc"
  },
  {
    id: "8",
    subject: "aut porro officiis laborum odit ea laudantium corporis",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    avatar: "https://via.placeholder.com/150/54176f"
  },
  {
    id: "9",
    subject: "qui eius qui autem sed",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    avatar: "https://via.placeholder.com/150/51aa97"
  },
  {
    id: "10",
    subject: "beatae et provident et ut vel",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    avatar: "https://via.placeholder.com/150/810b14"
  },
  {
    id: "11",
    subject: "nihil at amet non hic quia qui",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    avatar: "https://via.placeholder.com/150/1ee8a4"
  },
  {
    id: "12",
    subject:
      "mollitia soluta ut rerum eos aliquam consequatur perspiciatis maiores",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    avatar: "https://via.placeholder.com/150/66b7d2"
  }
];

export const getEmails = (callback = () => { }) => {
  return (dispatch: any) => {
    dispatch(loadingEmails());
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        dispatch(loadingEmailSuccess(list));
        callback();
        resolve();
      }, 0);
    });
  };
};


export const getSelectedEmailAction = (id: string, found = () => { }, notFound = () => { }) => {
  return (dispatch: any) => {
    dispatch(loadSelecteEmail(id));
    return new Promise((resolve, reject) => {
      try {
        const selectedEmail = list.find(item => item.id === id);
        if (selectedEmail) {
          dispatch(loadSelecteEmailSuccessAction(selectedEmail))
          found();
          resolve();
        } else {
          dispatch(loadSelectedEmailFailAction());
          notFound();
          reject();
        };
      } catch (err) {
        reject();
      }
    });
  }
}