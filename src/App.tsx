import React, { Fragment, useState } from "react";
import "./App.css";
import Greet from "./components/stateless/Greet/Greet";
import { MyThemeContext } from "./context/ThemeManager";
import { ThemeWidget } from "./components/stateless/ThemeWidget/ThemeWidget";
import { IThemes, Colors } from "./interfaces/Themes";
import { ErrorBoundaryComponent } from "./error-component/ErrorComponent";
import NavigationComponent from "./components/stateless/Navigation/Navigation";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import RouterNavigation from "./utils/routes.util";

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
                <Greet name={name} />
                <ThemeWidget themes={themeList} changeTheme={changeTheme} />
                <NavigationComponent />
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
