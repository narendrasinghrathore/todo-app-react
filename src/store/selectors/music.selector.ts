import { IState } from "../../interfaces/State";

export const getMusicResult = (state: IState) => state.music.results;
export const getMusicStatus = (state: IState) => state.music.isLoading;
export const getMusicResultCount = (state: IState) => state.music.resultCount;
