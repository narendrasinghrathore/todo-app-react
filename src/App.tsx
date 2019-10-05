import React from "react";
import "./App.css";
import Greet from "./components/stateless/Greet";

export default class App extends React.Component {
  render() {
    const name = "Narendra";
    return (
      <div className="App">
        <header className="App-header">
          <Greet name={name} />
        </header>
      </div>
    );
  }
}
