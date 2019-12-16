import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SearchMusic } from "../../../store/actions/music.action";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {
  getMusicResult,
  getMusicStatus
} from "../../../store/selectors/music.selector";
import { IState } from "../../../interfaces/State";

import { IMusicItem } from "../../../interfaces/MusicItem";
import TodoMusicList from "../../stateless/TodoMusicList/TodoMusicList";

const TodoMusic = (props: any) => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState("");

  const list = useSelector((state: IState) => getMusicResult(state));

  const isLoading = useSelector((state: IState) => getMusicStatus(state));

  let unsubscribe: any;
  useEffect(() => {
    return unsubscribe;
  }, [unsubscribe]);

  const handleSubmit = () => {
    unsubscribe = dispatch(SearchMusic(term));
  };

  return (
    <>
      <TextField
        id="search-term"
        label="Find music..."
        variant="outlined"
        fullWidth
        onChange={e => setTerm(e.target.value)}
      />
      <Button title="Search music" onClick={handleSubmit}>
        Search
      </Button>
      <ul>
        {isLoading ? (
          <li>loading...</li>
        ) : (
          <>
            <TodoMusicList list={list} />
          </>
        )}
      </ul>
    </>
  );
};

export default TodoMusic;
