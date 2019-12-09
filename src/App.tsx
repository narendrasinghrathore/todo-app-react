import React, { Fragment, useState, Suspense, lazy } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import RouterNavigation from "./utils/routes.util";
import { MyThemeContext } from "./context/ThemeManager";
import { ThemeWidget } from "./components/stateless/ThemeWidget/ThemeWidget";
import { IThemes, Colors } from "./interfaces/Themes";
import { ErrorBoundaryComponent } from "./error-component/ErrorComponent";
/**
 * Lazy loading components
 */
const Greet = lazy(() => import("./components/stateless/Greet/Greet"));
const NavigationComponent = lazy(() =>
  import("./components/stateless/Navigation/Navigation")
);
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

  const name = "Narendra";

  return (
    <ErrorBoundaryComponent>
      <Fragment>
        <MyThemeContext.Provider value={theme}>
          <Router>
            <div className="App">
              <header className="App-header">
                <Suspense fallback={<div>Loading ...</div>}>
                  <Greet name={name} />
                  <ThemeWidget themes={themeList} changeTheme={changeTheme} />
                  <NavigationComponent />
                </Suspense>
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
