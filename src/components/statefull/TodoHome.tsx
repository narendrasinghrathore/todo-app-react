import { TodoListContainer } from '../stateless/TodoListContainer/TodoListContainer';
import React, { Fragment, useState } from 'react';
import { ITodoListItem } from '../../interfaces/TodoListItem';
import { TodoAdd } from './TodoAdd/TodoAdd';
import { ITodoHome } from '../../interfaces/TodoHome';

export function TodoHome() {
  const initialData = [
    {
      id: 'b77d409a-10cd-4a47-8e94-b0cd0ab50aa1',
      name: 'Code-Splitting',
      content:
        'Most React apps will have their files “bundled” using tools like Webpack, Rollup or Browserify. Bundling is the process of following imported files and merging them into a single file: a “bundle”. This bundle can then be included on a webpage to load an entire app at once.'
    },
    {
      id: 'b77d409a-10cd-4a47-8e94-b0cd0ab50aa2',
      name: 'Context',
      content:
        'In a typical React application, data is passed top-down (parent to child) via props, but this can be cumbersome for certain types of props (e.g. locale preference, UI theme) that are required by many components within an application. Context provides a way to share values like these between components without having to explicitly pass a prop through every level of the tree.'
    }
  ];
  const [state, setState] = useState(initialData);

  const onNewItem = (item: any) => {
    const list = [...state, item];
    setState(list);
  };
  const onRemoveItem = (id: string) => {
    const list = state.filter((item: ITodoListItem) => item.id !== id);
    setState(list);
  };

  return (
    <Fragment>
      <TodoAdd handleAddNewItem={(item: ITodoListItem) => onNewItem(item)} />
      <TodoListContainer
        onRemoveItem={(id: string) => onRemoveItem(id)}
        list={state}
      />
    </Fragment>
  );
}
