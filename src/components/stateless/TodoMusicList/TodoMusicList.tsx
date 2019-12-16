import React, { useState } from "react";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import { IMusicItem } from "../../../interfaces/MusicItem";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import AlbumIcon from "@material-ui/icons/Album";
import styled from "styled-components";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper
    },
    nested: {
      paddingLeft: theme.spacing(4)
    }
  })
);

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;
export default function TodoMusicList({ list }: any) {
  const classes = useStyles();
  const audio = new Audio();

  // const [buffer, setBuffer] = useState(false);
  const [playingItem, setPlayingItem] = useState<IMusicItem>();
  const [playing, setPlaying] = useState(false);

  audio.onwaiting = () => {
    console.log("buffering..");
  };

  audio.oncanplay = () => {
    console.log("Progress ..");
  };

  audio.onplaying = () => {
    setPlaying(true);
  };

  const play = (item: IMusicItem) => {
    audio.src = item.previewUrl;
    console.log(audio.oncanplay);
    audio.play();
    setPlayingItem(item);
  };

  // const pause = (url: string) => {
  //   audio.pause();
  // };
  return (
    <>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            <>
              <b> Searched Result: </b>
              {playing ? (
                <Div>
                  <PlayCircleOutlineIcon /> Now Playing:{" "}
                  {playingItem?.trackName}
                </Div>
              ) : null}
            </>
          </ListSubheader>
        }
        className={classes.root}
      >
        {list.map((item: IMusicItem, index: number) => (
          <ListItem key={index}>
            <ListItemIcon>
              <AlbumIcon onClick={() => play(item)} />
            </ListItemIcon>
            <ListItemText primary={item.trackName} />
          </ListItem>
        ))}
      </List>
    </>
  );
}
