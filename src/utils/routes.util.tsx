import React, { Fragment } from 'react';
import TodoImageList from '../components/statefull/TodoImageList/TodoImageList';
import TodoHome from '../components/statefull/TodoHome/TodoHome';
import { Route } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import PermMediaIcon from '@material-ui/icons/PermMedia';
export const RouteConfig = [
  {
    path: '/',
    component: <TodoHome />,
    value:'home',
    label:'Home',
    icon: <HomeIcon />
  },
  {
    path: '/images',
    component: <TodoImageList />,
    icon:<PermMediaIcon/>,
    label:'Images'
  }
];
export default function RouterNavigation(props: any) {
  return (
    <Fragment>
      {RouteConfig.map((route, i) => (
        <Route exact path={route.path} key={i}>
          {route.component}
        </Route>
      ))}
    </Fragment>
  );
}
