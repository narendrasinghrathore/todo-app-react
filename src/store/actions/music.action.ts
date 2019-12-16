import AxiosHttp from "../../utils/http.util";

const MUSIC = "[MUSIC]";
export const REQUEST_MUSIC_SEARCH = `${MUSIC} Request Initiated`;
export const REQUEST_MUSIC_SUCCESS = `${MUSIC} Request Success`;
export const REQUEST_MUSIC_FAIL = `${MUSIC} Request Failed`;

const http = new AxiosHttp();

const apiUrl = `https://itunes.apple.com/search?term=`;

export const requestMusicSearch = (term: string) => ({
  type: REQUEST_MUSIC_SEARCH
});

export const requestMusicSearchSuccess = (payload: any) => ({
  type: REQUEST_MUSIC_SUCCESS,
  payload
});

export const requestMusicSearchFail = (error: any) => ({
  type: REQUEST_MUSIC_FAIL,
  error
});

export const SearchMusic = (term: string) => {
  return (disptach: any) => {
    disptach(requestMusicSearch(term));
    return http.request(
      {
        method: "GET",
        url: `${apiUrl}${term}`
      },
      (response: any) => {
        const { resultCount, results } = response.data;
        const data = { resultCount, results };
        disptach(requestMusicSearchSuccess(data));
      },
      (reject: any) => {
        disptach(requestMusicSearchFail(reject));
      }
    );
  };
};
