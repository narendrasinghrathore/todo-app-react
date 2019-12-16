import React, { useState } from "react";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import { IMusicItem } from "../../../interfaces/MusicItem";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
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
export default function TodoMusicList({ list }: any) {
  const classes = useStyles();
  const audio = new Audio();

  const [buffer, setBuffer] = useState(false);

  audio.onwaiting = () => {
      console.log('buffering..');
  }

  audio.oncanplay = () => {
      console.log('Progress ..');
  }
  const play = (url: string) => {
    audio.src = url;
    console.log(audio.oncanplay);
    audio.play();
  };

  const pause = (url: string) => {
    audio.pause();
  };
  return (
    <>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Searched Result
          </ListSubheader>
        }
        className={classes.root}
      >
        {list.map((item: IMusicItem, index: number) => (
          
            <ListItem key={index}>
              <ListItemIcon>
                <PlayCircleOutlineIcon onClick={() => play(item.previewUrl)} />
              </ListItemIcon>
              <ListItemText primary={item.trackName} />
            </ListItem>
          
        ))}
      </List>
    </>
  );
}
