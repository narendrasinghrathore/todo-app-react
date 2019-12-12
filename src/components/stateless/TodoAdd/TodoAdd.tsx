import React, { Fragment, useContext, useState } from "react";
import "./TodoAdd.css";
import { ITodoListItem } from "../../../interfaces/TodoListItem";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { MyThemeContext } from "../../../context/ThemeManager";
import { connect } from "react-redux";
import { AddTodo } from "../../../store/actions/todo.action";

const useStyles = () =>
  makeStyles(theme => ({
    container: {
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "column"
    },
    fab: {
      margin: theme.spacing(3)
    },
    extendedIcon: {
      marginRight: theme.spacing(1)
    },
    textField: {
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(3),
      width: 200
    }
  }));
const TodoAdd = (props: any) => {
  /**
   * The contextType property on a class can be assigned a Context object created by React.createContext().
   * This lets you consume the nearest current value of that Context type using this.context.
   * You can reference this in any of the lifecycle methods including the render function.
   */
  const context = useContext(MyThemeContext);

  const classes: any = useStyles();

  const theme = context;
  const color : any = theme.color;

  const initialState: ITodoListItem = {
    name: "",
    content: ""
  };

  const [state, setState] = useState<ITodoListItem>(initialState);

  const disableAddButton = () => {
    if (state.name && state.content) {
      return state!.name!.length > 0 && state!.content!.length > 0
        ? false
        : true;
    }
    return true;
  };

  /**
   * Handle form submit
   */
  const handleFormSubmit = (event: any) => {
    let item = { ...state, id: Math.random().toString() };
    props.add(item);
    setState(initialState);
    event.preventDefault();
  };

  const handleChange = (event: any) => {
    const target = event.target;
    const name = target.name;
    const value: string = target.value;

    setState({
      ...state,
      [name]: value
    });
  };

  return (
    <div className="TodoAddContainer">
      <Fragment>
        <TextField
          color={color}
          name="name"
          required
          id="standard-required"
          label="Title"
          value={state.name}
          onChange={handleChange}
          classes={classes!.textField}
          margin="normal"
          variant="outlined"
        />
      </Fragment>
      <Fragment>
        <TextField
          color={color}
          required
          name="content"
          id="standard-required"
          label="Description"
          value={state.content}
          onChange={handleChange}
          classes={classes!.textField}
          margin="normal"
          variant="outlined"
          multiline
          rows="4"
        />
      </Fragment>
      <Fab
        color={color}
        disabled={disableAddButton()}
        onClick={handleFormSubmit}
        aria-label="add"
        classes={{ root: classes!.fab }}
      >
        <AddIcon />
      </Fab>
    </div>
  );
};

const mapDispatchoProps = (dispatch: any) => ({
  add: (item: ITodoListItem) => dispatch(AddTodo(item))
});

export default connect(null, mapDispatchoProps)(TodoAdd);
