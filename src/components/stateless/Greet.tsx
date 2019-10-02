import React from "react";
import { greetUser, IDay } from "../../utils/core.utils";
import { IGreet } from "../../interfaces/Greet";
export default class Greet extends React.Component<IGreet> {
  render() {
    const message = this.props.name ? `, ${this.props.name}!` : " !!!";

    return <h1>Hello there{message}</h1>;
  }
}
