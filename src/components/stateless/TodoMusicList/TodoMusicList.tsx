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
import NowPlaying from "../NowPlaying/NowPlaying";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import { useDispatch } from "react-redux";
import { showNotificationAction } from "../../../store/actions/notification.action";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  })
);

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;
export default function TodoMusicList(props: any) {
  const { list }: { list: IMusicItem[] } = props;
  const classes = useStyles();
  const audio = document.querySelector("audio") || new Audio();

  const dispatch = useDispatch();

  const [buffer, setBuffer] = useState(false);
  const [playingItem, setPlayingItem] = useState<IMusicItem>();
  const [playing, setPlaying] = useState(false);
  // const [pausedItem, setPauseItem] = useState<IMusicItem>();

  /**
   * Call when media playing ends or error
   */
  const onMediaPlayingEnded = () => {
    setPlaying(false);
    setPlayingItem(undefined);
  };

  audio.onwaiting = () => {
    console.log("buffering..");
    setBuffer(true);
  };

  audio.oncanplay = () => {
    console.log("Progress ..");
  };

  audio.onplaying = () => {
    setBuffer(false);
    setPlaying(true);
  };

  audio.onended = () => {
    onMediaPlayingEnded();
  };

  /**
   * If media playing fail
   */
  audio.onerror = () => {
    onMediaPlayingEnded();
    dispatch(
      showNotificationAction({
        message: "Media not found, playback fail.",
        open: true,
        autohide: 2000,
      })
    );
  };

  const play = (item: IMusicItem) => {
    audio.currentTime = 0;
    audio.src = item.previewUrl;
    audio.play();
    setPlayingItem(item);
  };

  audio.onpause = () => {
    console.log("Paused");
  };

  const pausePlay = (item: IMusicItem) => {
    audio.pause();
  };

  return (
    <>
      <audio id="audio-player">
        <track kind="captions" />
      </audio>
      <NowPlaying
        open={playing}
        content={
          <Div>
            <PlayCircleOutlineIcon style={{ padding: "0 10px 0 0" }} />
            Now Playing: {playingItem?.trackName} | Album:{" "}
            {playingItem?.artistName}
          </Div>
        }
      />
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            <>{list.length > 0 && <b> Searched Result: </b>}</>
          </ListSubheader>
        }
        className={classes.root}
      >
        {list.map((item: IMusicItem, index: number) => (
          <ListItem key={index}>
            <ListItemIcon>
              {playingItem?.previewUrl === item.previewUrl ? (
                buffer ? (
                  <HourglassEmptyIcon />
                ) : (
                  <PauseCircleOutlineIcon onClick={() => pausePlay(item)} />
                )
              ) : (
                <AlbumIcon onClick={() => play(item)} />
              )}
            </ListItemIcon>
            <ListItemText primary={item.trackName} />
          </ListItem>
        ))}
      </List>
    </>
  );
}
