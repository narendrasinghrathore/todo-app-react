import React, { Fragment } from "react";
import "./App.css";
import Greet from "./components/stateless/Greet";
import { TodoHome } from "./components/statefull/TodoHome";
import { MyThemeContext } from "./context/ThemeManager";
import { ThemeWidget } from "./components/stateless/ThemeWidget/ThemeWidget";
import { IThemes } from "./interfaces/Themes";
import { IAppState } from "./interfaces/App";

export default class App extends React.Component<any, IAppState> {
  themeList: IThemes[] = [
    { label: "primary theme", color: "primary" },
    { label: "secondary theme", color: "secondary" }
  ];

  constructor(props: any) {
    super(props);
    this.state = {
      theme: this.themeList[0]
    };
  }

  changeTheme = (theme: IThemes) => {
    if (theme) {
      this.setState({
        theme
      });
    }
  };

  render() {
    const name = "Narendra";
    return (
      <div className="App">
        <header className="App-header">
          <Greet name={name} />
          <ThemeWidget themes={this.themeList} changeTheme={this.changeTheme} />
        </header>
        <Fragment>
          <MyThemeContext.Provider value={this.state.theme}>
            <TodoHome />
          </MyThemeContext.Provider>
        </Fragment>
      </div>
    );
  }
}
