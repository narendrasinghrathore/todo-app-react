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
import styled from "styled-components";

const Div = styled.div`
  padding: 0 10px;
`;

const Text = styled(TextField)`
  margin: 10px auto;
`;

const TodoMusic = (props: any) => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState("");

  const list: IMusicItem[] = useSelector((state: IState) =>
    getMusicResult(state)
  );

  const isLoading = useSelector((state: IState) => getMusicStatus(state));

  let unsubscribe: any;
  useEffect(() => {
    return unsubscribe;
  }, [unsubscribe]);

  const handleSubmit = () => {
    unsubscribe = dispatch(SearchMusic(term));
  };

  const onEnter = (e: KeyboardEvent | any) => {
    if (e.key === "Enter") {
      unsubscribe = dispatch(SearchMusic(term));
    }
  };

  return (
    <Div>
      <Text
        id="search-term"
        label="Find music..."
        variant="outlined"
        fullWidth
        onKeyDown={e => onEnter(e)}
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
    </Div>
  );
};

export default TodoMusic;
