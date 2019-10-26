import React from "react";
import { useSpring, animated } from "react-spring";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";

import EventNoteIcon from "@material-ui/icons/EventNote";
import DeleteIcon from "@material-ui/icons/Delete";

import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";

export function TodoListItem(props: any) {
  const config = useSpring({ opacity: 1, from: { opacity: 0 } });

  const name = props.name;
  const content = props.content;
  return (
    <animated.div style={config}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <EventNoteIcon color="primary" />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          aria-label={name}
          color="primary"
          primary={name}
          secondary={content}
        />
        <ListItemSecondaryAction>
          <IconButton
            onClick={() => props.onRemoveItem(props.id)}
            edge="end"
            aria-label={"delete " + name}
          >
            <DeleteIcon color="primary" />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </animated.div>
  );
}
