import React, { Fragment } from "react";
import "./TodoAdd.css";
import { ITodoListItem, ITodoAdd } from "../../interfaces/TodoListItem";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

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
export class TodoAdd extends React.Component<ITodoAdd, ITodoListItem> {
  classes = useStyles();
  state: ITodoListItem = {};

  constructor(props: any) {
    super(props);
    this.state = {
      content: "",
      name: "",
      id: ""
    };
  }

  disableAddButton = () =>
    this.state.name.length > 0 && this.state.content.length > 0 ? false : true;

  /**
   * Handle form submit
   */
  handleFormSubmit = (event: any) => {
    let item = { ...this.state, id: Math.random().toString() };
    this.props.handleAddNewItem(item);
    event.preventDefault();
  };

  handleChange = (event: any) => {
    const target = event.target;
    const name = target.name;
    const value: string = target.value;

    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div className="TodoAddContainer">
        <Fragment>
          <TextField
            name="name"
            required
            id="standard-required"
            label="Title"
            value={this.state.name}
            onChange={this.handleChange}
            classes={this.classes.textField}
            margin="normal"
            variant="outlined"
          />
        </Fragment>
        <Fragment>
          <TextField
            required
            name="content"
            id="standard-required"
            label="Description"
            value={this.state.content}
            onChange={this.handleChange}
            classes={this.classes.textField}
            margin="normal"
            variant="outlined"
          />
        </Fragment>

        <Fab
          color="primary"
          disabled={this.disableAddButton()}
          onClick={this.handleFormSubmit}
          aria-label="add"
          classes={{ root: this.classes.fab }}
        >
          <AddIcon />
        </Fab>
      </div>
    );
  }
}
