import { IMusicResult } from "../../interfaces/MusicResult";
import {
  REQUEST_MUSIC_SEARCH,
  REQUEST_MUSIC_SUCCESS,
  REQUEST_MUSIC_FAIL
} from "../actions/music.action";

const initialData: IMusicResult = {
  isLoading: false,
  resultCount: 0,
  results: [],
  error: null
};

const music = (state = initialData, action: any): IMusicResult => {
  switch (action.type) {
    case REQUEST_MUSIC_SEARCH: {
      return { ...state, isLoading: true, error: null };
    }
    case REQUEST_MUSIC_SUCCESS: {
      const { resultCount, results } = action.payload;
      return { ...state, isLoading: false, results, resultCount };
    }
    case REQUEST_MUSIC_FAIL: {
      const error = action.error;
      return { ...state, isLoading: false, error };
    }
    default: {
      return { ...state };
    }
  }
};
export default music;
