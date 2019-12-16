import { IMusicItem } from "./MusicItem";

export interface IMusicResult {
  results: IMusicItem[];
  resultCount: number;
  isLoading: boolean;
  error: any;
}
