import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { TransitionProps } from "@material-ui/core/transitions/transition";
import Grow from "@material-ui/core/Grow";
/**
 * Show current playing song/audio file.
 * @param props 
 */
export default function NowPlaying(props: any) {
  const GrowTransition = (props: TransitionProps) => {
    return <Grow {...props} />;
  };
  return (
    <Snackbar
      open={props.open}
      onClose={props.handleClose}
      TransitionComponent={GrowTransition}
      ContentProps={{
        "aria-describedby": "message-id"
      }}
      message={props.content}
    />
  );
}
