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
import { useDispatch } from "react-redux";
import { GetSelectedTodo } from "../../../store/actions/todo.action";

export function TodoListItem(props: any) {
  const config = useSpring({ opacity: 1, from: { opacity: 0 } });
  const history = useHistory();
  /**
   * This hook returns a reference to the dispatch function from the Redux store. You may use it to dispatch actions as needed.
   */
  const dispatch = useDispatch();
  const name = props.name;
  const content = props.content;
  const color = props.color;

  const editTodo = (id: string): void => {
    dispatch(GetSelectedTodo(id));
    history.push(`/add/${props.id}`);
  };

  return (
    <ListItem>
      <animated.div style={config}>
        <ListItemAvatar>
          <Avatar>
            <EventNoteIcon color={color} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          style={{ padding: "0 25px 0 0" }}
          aria-label={name}
          color={color}
          primary={name}
          secondary={content}
        />
        <ListItemSecondaryAction>
          <IconButton
            onClick={() => editTodo(props.id)}
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
      </animated.div>
    </ListItem>
  );
}
