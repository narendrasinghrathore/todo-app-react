import React, { Fragment, lazy } from "react";

import { connect } from "react-redux";
import { DeleteTodo } from "../../../store/actions/todo.action";
import { IState } from "../../../interfaces/State";
import SuspenseContainer from "../../../shared/Loader/Loader";
/**
 * Lazy loading imports
 */

const TodoListContainer = lazy(() =>
  import("../../stateless/TodoListContainer/TodoListContainer")
);

const TodoHome = (props: any) => {
  return (
    <Fragment>
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
  remove: (id: string) => dispatch(DeleteTodo(id))
});
export default connect(mapStateToProps, mapDispatchToProps)(TodoHome);
