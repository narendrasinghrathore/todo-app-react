import React from "react";
import "./App.css";
import Greet from "./components/stateless/Greet";
import { TodoHome } from "./components/statefull/TodoHome";

export default class App extends React.Component {
  render() {
    const name = "Narendra";
    return (
      <div className="App">
        <header className="App-header">
          <Greet name={name} />
          <TodoHome />
        </header>
      </div>
    );
  }
}
