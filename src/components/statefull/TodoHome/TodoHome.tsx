import { TodoListContainer } from "../../stateless/TodoListContainer/TodoListContainer";
import React, { Fragment } from "react";
import { ITodoListItem } from "../../../interfaces/TodoListItem";
import { TodoAdd } from "../TodoAdd/TodoAdd";
import { connect } from "react-redux";
import { AddTodo, DeleteTodo } from "../../../store/actions/todo.action";

const TodoHome = (props: any) => {
  console.log(props);
  return (
    <Fragment>
      <TodoAdd handleAddNewItem={(item: ITodoListItem) => props.add(item)} />
      <TodoListContainer
        onRemoveItem={(id: string) => props.remove(id)}
        list={props.list}
      />
    </Fragment>
  );
};

const mapStateToProps = (state: any) => ({ list: state.list });
const mapDispatchToProps = (dispatch: any) => ({
  add: (item: ITodoListItem) => dispatch(AddTodo(item)),
  remove: (id: string) => dispatch(DeleteTodo(id))
});
export default connect(mapStateToProps, mapDispatchToProps)(TodoHome);
