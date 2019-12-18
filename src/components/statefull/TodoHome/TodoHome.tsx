import React, { Fragment, lazy } from "react";

import { useDispatch, useSelector } from "react-redux";
import { DeleteTodo } from "../../../store/actions/todo.action";
import { IState } from "../../../interfaces/State";
import SuspenseContainer from "../../../shared/Loader/Loader";
import { getTodoList } from "../../../store/selectors/todo.selector";
/**
 * Lazy loading imports
 */

const TodoListContainer = lazy(() =>
  import("../../stateless/TodoListContainer/TodoListContainer")
);

const TodoHome = (props: any) => {
  const dispatch = useDispatch();
  const list = useSelector((state: IState) => getTodoList(state));
  return (
    <Fragment>
      <SuspenseContainer>
        <TodoListContainer
          onRemoveItem={(id: string) => dispatch(DeleteTodo(id))}
          list={list}
        />
      </SuspenseContainer>
    </Fragment>
  );
};
export default TodoHome;
