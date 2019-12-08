import React, { Fragment } from "react";
import "./App.css";
import Greet from "./components/stateless/Greet/Greet";
import { MyThemeContext } from "./context/ThemeManager";
import { ThemeWidget } from "./components/stateless/ThemeWidget/ThemeWidget";
import { IThemes, Colors } from "./interfaces/Themes";
import { IAppState } from "./interfaces/App";
import { ErrorBoundaryComponent } from "./error-component/ErrorComponent";
import AxiosHttp from "./utils/http.util";
import NavigationComponent from "./components/stateless/Navigation/Navigation";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import RouterNavigation from "./utils/routes.util";

export default class App extends React.Component<any, IAppState> {
  themeList: IThemes[] = [
    { label: "primary theme", color: Colors.primary },
    { label: "secondary theme", color: Colors.secondary }
  ];

  constructor(props: any) {
    super(props);
    this.state = {
      theme: this.themeList[0]
    };
  }

  http = new AxiosHttp();

  changeTheme = (theme: IThemes) => {
    if (theme) {
      this.setState({
        theme
      });
    }
  };

  name = "Narendra";

  render() {
    return (
      <ErrorBoundaryComponent>
        <Fragment>
          <MyThemeContext.Provider value={this.state.theme}>
            <Router>
              <div className="App">
                <header className="App-header">
                  <Greet name={this.name} />
                  <ThemeWidget
                    themes={this.themeList}
                    changeTheme={this.changeTheme}
                  />
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
}
