import React, { Fragment, lazy } from "react";
import TodoImageList from "../components/statefull/TodoImageList/TodoImageList";
import TodoHome from "../components/statefull/TodoHome/TodoHome";
import { Route } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import PermMediaIcon from "@material-ui/icons/PermMedia";
import PostAddIcon from "@material-ui/icons/PostAdd";
import SuspenseContainer from "../shared/Loader/Loader";
import { IRouteConfig } from "../interfaces/routeconfig.";
import LockIcon from "@material-ui/icons/Lock";

/**
 * Lazy loading routes
 */
const Login = lazy(() => import("../components/stateless/Login/Login"));

const TodoAdd = lazy(() => import("../components/stateless/TodoAdd/TodoAdd"));

export const RouteConfig: IRouteConfig[] = [
  {
    path: "/",
    component: <TodoHome />,
    value: "home",
    label: "Home",
    icon: <HomeIcon />,
    goto: "/"
  },
  {
    goto: "/add",
    path: "/add/:id?", // Optional parameter are postfix by ? and should be placed at end
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
    value: "Browse images",
    goto: "/images"
  },
  {
    path: "/login",
    component: (
      <SuspenseContainer>
        <Login />
      </SuspenseContainer>
    ),
    icon: <LockIcon />,
    label: "Login",
    value: "login",
    goto: "/login"
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
