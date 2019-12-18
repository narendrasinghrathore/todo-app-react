import React, { Fragment, useContext, useState, useEffect } from "react";
import "./TodoAdd.css";
import { ITodoListItem } from "../../../interfaces/TodoListItem";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { MyThemeContext } from "../../../context/ThemeManager";
import { useDispatch, useSelector } from "react-redux";
import {
  AddTodo,
  RemoveSelectedTodo,
  GetSelectedTodo,
  EditSelectedTodo
} from "../../../store/actions/todo.action";
import { useParams, useHistory } from "react-router-dom";
import { IState } from "../../../interfaces/State";
import { getSelectedTodoState } from "../../../store/selectors/todo.selector";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import SaveIcon from "@material-ui/icons/Save";

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
const TodoAdd = () => {
  /**
   * The contextType property on a class can be assigned a Context object created by React.createContext().
   * This lets you consume the nearest current value of that Context type using this.context.
   * You can reference this in any of the lifecycle methods including the render function.
   */
  const context = useContext(MyThemeContext);

  const classes: any = useStyles();

  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { id } = useParams();
  // disptach action
  const dispatch = useDispatch();

  const selectedTodo = useSelector((state: IState) =>
    getSelectedTodoState(state)
  );

  const [edit, setEdit] = useState(false);

  const theme = context;
  const color: any = theme.color;

  /**
   * For navigation i.e router api
   */
  const history = useHistory();

  let initialState: ITodoListItem | any = {
    name: "",
    content: ""
  };

  const [state, setState] = useState<ITodoListItem | any>(initialState);

  // Adding sipatch action in other useEffect result in useEffect  call twice
  // so it's better to separate the logic.
  useEffect(() => {
    if (id) {
      if (selectedTodo === undefined) {
        dispatch(GetSelectedTodo(id));
      }
    }
  }, [id, selectedTodo, dispatch]);

  useEffect(() => {
    if (selectedTodo) {
      setEdit(true);
      setState(selectedTodo);
    }
  }, [selectedTodo]);

  // Remove selected if any on component unmount
  useEffect(() => {
    return () => {
      dispatch(RemoveSelectedTodo());
    };
  }, [dispatch]);

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
    if (edit) {
      dispatch(EditSelectedTodo({ ...state }));
    } else {
      let item = { ...state, id: Math.random().toString() };
      dispatch(AddTodo(item));
    }
    resetForm();
    event.preventDefault();
    history.replace("/");
  };

  const resetForm = () => {
    setState(initialState);
    setEdit(false);
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
      <Breadcrumbs aria-label="breadcrumb">
        <Link color={color} onClick={() => history.push("/")}>
          Home
        </Link>
        <Typography color="textPrimary">Todo</Typography>
      </Breadcrumbs>
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
        {edit ? <SaveIcon /> : <AddIcon />}
      </Fab>
    </div>
  );
};
export default TodoAdd;
