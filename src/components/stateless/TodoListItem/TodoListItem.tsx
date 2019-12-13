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
import EditIcon from "@material-ui/icons/Edit";
/**
 * 
 * Navigation
 */
import { useHistory } from "react-router-dom";


export function TodoListItem(props: any) {
  const config = useSpring({ opacity: 1, from: { opacity: 0 } });
  const history = useHistory();
  const name = props.name;
  const content = props.content;
  const color = props.color;
  return (
    <animated.div style={config}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <EventNoteIcon color={color} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          style={{ padding: '0 25px 0 0' }}
          aria-label={name}
          color={color}
          primary={name}
          secondary={content}
        />
        <ListItemSecondaryAction>
          <IconButton
            onClick={() => history.push(`/add/${props.id}`)}
            edge="end"
            aria-label={"delete " + name}
          >
            <EditIcon color={color} />
          </IconButton>
          <IconButton
            onClick={() => props.onRemoveItem(props.id)}
            edge="end"
            aria-label={"delete " + name}
          >
            <DeleteIcon color={color} />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </animated.div>
  );
}
