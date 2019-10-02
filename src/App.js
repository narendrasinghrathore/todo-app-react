import React from "react";
import logo from "./list.svg";
import "./App.css";

import Logo from "./components/stateless/Logo";
import Greet from "./components/stateless/Greet";

export default class App extends React.Component {
  render() {
    const name = "Narendra";
    return (
      <div className="App">
        <header className="App-header">
          <Logo src={logo} />
          <Greet name={name} />
        </header>
      </div>
    );
  }
}
