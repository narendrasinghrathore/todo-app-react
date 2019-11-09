import React from "react";
import logo from "../../../assets/sunny_day.svg";
import { ILogo } from "../../../interfaces/Logo";
export default class Logo extends React.Component<ILogo> {
  render() {
    const src = this.props.src || logo;
    return <img src={src} className="App-logo" alt="logo morning" />;
  }
}
