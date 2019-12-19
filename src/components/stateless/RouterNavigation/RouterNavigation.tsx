import React, { Fragment } from "react";
import { RouteConfig } from "../../../utils/routes.util";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { IState } from "../../../interfaces/State";
import { isAuthSelector } from "../../../store/selectors/login.selector";
export default function RouterNavigation(props: any) {
  const loginInProcess = useSelector((state: IState) => isAuthSelector(state));
  return (
    <Fragment>
      {RouteConfig.map((route, i) =>
        route.isProtected ? (
          <Route
            render={({ location }) =>
              loginInProcess ? (
                route.component
              ) : (
                <Redirect
                  to={{
                    pathname: "/login",
                    state: { from: location }
                  }}
                />
              )
            }
            exact
            path={route.path}
            key={i}
          />
        ) : (
          <Route exact path={route.path} key={i}>
            {route.component}
          </Route>
        )
      )}
    </Fragment>
  );
}
