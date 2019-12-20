import React, { Fragment, useState, lazy } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RouterNavigation from "./components/stateless/RouterNavigation/RouterNavigation";
import { MyThemeContext } from "./context/ThemeManager";

import { IThemes, Colors } from "./interfaces/Themes";
import { ErrorBoundaryComponent } from "./error-component/ErrorComponent";

import SuspenseContainer from "./shared/Loader/Loader";
import NotificationSnackbar from "./components/stateless/NotificationSnackBar/NotificationSnackbar";

import PageNotFound from "./components/stateless/PageNotFound/PageNotFound";

const ThemeWidget = lazy(() =>
  import("./components/stateless/ThemeWidget/ThemeWidget")
);
const NavDrawer = lazy(() => import("./shared/Drawer/NavDrawer"));
/**
 * Routing configuration
 */

export default function App() {
  const themeList: IThemes[] = [
    { label: "primary theme", color: Colors.primary },
    { label: "secondary theme", color: Colors.secondary }
  ];

  const [theme, setTheme] = useState(themeList[0]);

  const changeTheme = (theme: IThemes) => {
    if (theme) {
      setTheme(theme);
    }
  };

  return (
    <ErrorBoundaryComponent>
      <Fragment>
        <MyThemeContext.Provider value={theme}>
          <Router>
            <SuspenseContainer>
              <NavDrawer />
            </SuspenseContainer>
            <NotificationSnackbar />
            <div className="App">
              <header className="App-header">
                <SuspenseContainer>
                  <ThemeWidget themes={themeList} changeTheme={changeTheme} />
                </SuspenseContainer>
              </header>
            </div>
            <Switch>
              <RouterNavigation />
              <Route path="*" children={<PageNotFound />} />
            </Switch>
          </Router>
        </MyThemeContext.Provider>
      </Fragment>
    </ErrorBoundaryComponent>
  );
}
