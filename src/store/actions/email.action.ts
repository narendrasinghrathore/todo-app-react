import { IEmailItem } from "../../interfaces/EmailItems";

export const EMAIL = '[EMAIL]';


export const LOAD_EMAILS = `${EMAIL} LOADING EMAILS`;

export const LOAD_EMAILS_SUCCESS = `${EMAIL} LOADING EMAILS SUCCESS`;

export const LOAD_EMAILS_FAIL = `${EMAIL} LOADING EMAILS FAIL`;

export const LOAD_SELECTED_EMAIL = `${EMAIL} LOADING SELECTED EMAIL`;


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


const list: IEmailItem[] = [
    {
        id: 1,
        subject: "accusamus beatae ad facilis cum similique qui sunt",
        description: "https://via.placeholder.com/600/92c952",
        avatar: "https://via.placeholder.com/150/92c952"
    },
    {
        id: 2,
        subject: "reprehenderit est deserunt velit ipsam",
        description: "https://via.placeholder.com/600/771796",
        avatar: "https://via.placeholder.com/150/771796"
    },
    {
        id: 3,
        subject: "officia porro iure quia iusto qui ipsa ut modi",
        description: "https://via.placeholder.com/600/24f355",
        avatar: "https://via.placeholder.com/150/24f355"
    },
    {
        id: 4,
        subject: "culpa odio esse rerum omnis laboriosam voluptate repudiandae",
        description: "https://via.placeholder.com/600/d32776",
        avatar: "https://via.placeholder.com/150/d32776"
    },
    {
        id: 5,
        subject: "natus nisi omnis corporis facere molestiae rerum in",
        description: "https://via.placeholder.com/600/f66b97",
        avatar: "https://via.placeholder.com/150/f66b97"
    },
    {
        id: 6,
        subject: "accusamus ea aliquid et amet sequi nemo",
        description: "https://via.placeholder.com/600/56a8c2",
        avatar: "https://via.placeholder.com/150/56a8c2"
    },
    {
        id: 7,
        subject:
            "officia delectus consequatur vero aut veniam explicabo molestias",
        description: "https://via.placeholder.com/600/b0f7cc",
        avatar: "https://via.placeholder.com/150/b0f7cc"
    },
    {
        id: 8,
        subject: "aut porro officiis laborum odit ea laudantium corporis",
        description: "https://via.placeholder.com/600/54176f",
        avatar: "https://via.placeholder.com/150/54176f"
    },
    {
        id: 9,
        subject: "qui eius qui autem sed",
        description: "https://via.placeholder.com/600/51aa97",
        avatar: "https://via.placeholder.com/150/51aa97"
    },
    {
        id: 10,
        subject: "beatae et provident et ut vel",
        description: "https://via.placeholder.com/600/810b14",
        avatar: "https://via.placeholder.com/150/810b14"
    },
    {
        id: 11,
        subject: "nihil at amet non hic quia qui",
        description: "https://via.placeholder.com/600/1ee8a4",
        avatar: "https://via.placeholder.com/150/1ee8a4"
    },
    {
        id: 12,
        subject:
            "mollitia soluta ut rerum eos aliquam consequatur perspiciatis maiores",
        description: "https://via.placeholder.com/600/66b7d2",
        avatar: "https://via.placeholder.com/150/66b7d2"
    }
];
