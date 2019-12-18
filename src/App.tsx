import React, { Fragment, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import RouterNavigation from "./utils/routes.util";
import { MyThemeContext } from "./context/ThemeManager";
import { ThemeWidget } from "./components/stateless/ThemeWidget/ThemeWidget";
import { IThemes, Colors } from "./interfaces/Themes";
import { ErrorBoundaryComponent } from "./error-component/ErrorComponent";
import NavDrawer from "./shared/Drawer/NavDrawer";
import SuspenseContainer from "./shared/Loader/Loader";
import NotificationSnackbar from "./components/stateless/NotificationSnackBar/NotificationSnackbar";
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
            <NavDrawer />
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
            </Switch>
          </Router>
        </MyThemeContext.Provider>
      </Fragment>
    </ErrorBoundaryComponent>
  );
}
