import React, { Fragment, lazy } from "react";
import { ITodoListItem } from "../../../interfaces/TodoListItem";

import { connect } from "react-redux";
import { AddTodo, DeleteTodo } from "../../../store/actions/todo.action";
import { IState } from "../../../interfaces/State";
import SuspenseContainer from "../../../shared/Loader/Loader";
/**
 * Lazy loading imports
 */
const TodoAdd = lazy(() => import("../TodoAdd/TodoAdd"));
const TodoListContainer = lazy(() =>
  import("../../stateless/TodoListContainer/TodoListContainer")
);

const TodoHome = (props: any) => {
  return (
    <Fragment>
      <SuspenseContainer>
        <TodoAdd handleAddNewItem={(item: ITodoListItem) => props.add(item)} />
      </SuspenseContainer>
      <SuspenseContainer>
        <TodoListContainer
          onRemoveItem={(id: string) => props.remove(id)}
          list={props.list}
        />
      </SuspenseContainer>
    </Fragment>
  );
};

const mapStateToProps = (state: IState) => ({ list: state.todos.list });
const mapDispatchToProps = (dispatch: any) => ({
  add: (item: ITodoListItem) => dispatch(AddTodo(item)),
  remove: (id: string) => dispatch(DeleteTodo(id))
});
export default connect(mapStateToProps, mapDispatchToProps)(TodoHome);
