import React, { lazy } from "react";
import { RouteConfig } from "../../../utils/routes.util";
import { Redirect, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import { IState } from "../../../interfaces/State";
import { isAuthSelector } from "../../../store/selectors/login.selector";
import SuspenseContainer from "../../../shared/Loader/Loader";

const PageNotFound = lazy(() => import("../PageNotFound/PageNotFound"));
export default function RouterNavigation(props: any) {
  const isAuthenticated = useSelector((state: IState) => isAuthSelector(state));
  const routes = RouteConfig.map((route, i) => (
    <Route
      render={({ location }) =>
        route.isProtected ? (
          isAuthenticated ? (
            route.component
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        ) : (
          route.component
        )
      }
      exact={route.path === "/" ? true : false}
      path={route.path}
      key={i}
    />
  ));
  return (
    <Switch>
      {routes}
      <Route key={RouteConfig.length}>
        <SuspenseContainer>
          <PageNotFound />
        </SuspenseContainer>
      </Route>
    </Switch>
  );
}
