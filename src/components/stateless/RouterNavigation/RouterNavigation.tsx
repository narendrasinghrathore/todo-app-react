import React, { Fragment, lazy } from "react";
import { RouteConfig } from "../../../utils/routes.util";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { IState } from "../../../interfaces/State";
import { isAuthSelector } from "../../../store/selectors/login.selector";
import SuspenseContainer from "../../../shared/Loader/Loader";

const PageNotFound = lazy(() => import("../PageNotFound/PageNotFound"));
export default function RouterNavigation(props: any) {
  const isAuthenticated = useSelector((state: IState) => isAuthSelector(state));
  return (
    <Fragment>
      {RouteConfig.map((route, i) => (
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
      ))}
      <Route
        key={RouteConfig.length}
        render={({ location }) => {
          return (
            <SuspenseContainer>
              <PageNotFound from={location.pathname} />
            </SuspenseContainer>
          );
        }}
      />
    </Fragment>
  );
}
