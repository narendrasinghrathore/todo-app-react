import React, { lazy } from "react";
import TodoImageList from "../components/statefull/TodoImageList/TodoImageList";
import TodoHome from "../components/statefull/TodoHome/TodoHome";
import HomeIcon from "@material-ui/icons/Home";
import PermMediaIcon from "@material-ui/icons/PermMedia";
import PostAddIcon from "@material-ui/icons/PostAdd";
import SuspenseContainer from "../shared/Loader/Loader";
import { IRouteConfig } from "../interfaces/routeconfig.";
import LockIcon from "@material-ui/icons/Lock";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
// import PageNotFound from "../components/stateless/PageNotFound/PageNotFound";
/**
 * Lazy loading routes
 */
const Login = lazy(() => import("../components/stateless/Login/Login"));

const TodoAdd = lazy(() => import("../components/stateless/TodoAdd/TodoAdd"));

const TodoMusic = lazy(() =>
  import("../components/statefull/TodoMusic/TodoMusic")
);

export const RouteConfig: IRouteConfig[] = [
  {
    path: "/",
    component: <TodoHome />,
    value: "home",
    label: "Home",
    icon: <HomeIcon />,
    goto: "/",
    isProtected: true,
    visible: true
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
    icon: <PostAddIcon />,
    isProtected: true,
    visible: true
  },
  {
    component: (
      <SuspenseContainer>
        <TodoMusic />
      </SuspenseContainer>
    ),
    goto: "/music",
    path: "/music", // Optional parameter are postfix by ? and should be placed at end
    value: "music",
    label: "Find Music",
    icon: <LibraryMusicIcon />,
    isProtected: true,
    visible: true
  },
  {
    path: "/images",
    component: <TodoImageList />,
    icon: <PermMediaIcon />,
    label: "Images",
    value: "Browse images",
    goto: "/images",
    isProtected: true,
    visible: true
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
    value: "Login page",
    goto: "/login",
    isProtected: false,
    visible: true
  }
];
