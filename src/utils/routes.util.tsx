import React, { Fragment, lazy } from "react";
import TodoImageList from "../components/statefull/TodoImageList/TodoImageList";
import TodoHome from "../components/statefull/TodoHome/TodoHome";
import { Route } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import PermMediaIcon from "@material-ui/icons/PermMedia";
import PostAddIcon from "@material-ui/icons/PostAdd";
import SuspenseContainer from "../shared/Loader/Loader";
const TodoAdd = lazy(() => import("../components/stateless/TodoAdd/TodoAdd"));
export const RouteConfig = [
  {
    path: "/",
    component: <TodoHome />,
    value: "home",
    label: "Home",
    icon: <HomeIcon />
  },
  {
    path: "/add",
    component: (
      <SuspenseContainer>
        <TodoAdd />
      </SuspenseContainer>
    ),
    value: "add",
    label: "Add new todo",
    icon: <PostAddIcon />
  },
  {
    path: "/images",
    component: <TodoImageList />,
    icon: <PermMediaIcon />,
    label: "Images",
    value: "Browse images"
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
