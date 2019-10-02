import React from "react";
import logo from "../../assets/noon.svg";
import { ILogo } from "../../interfaces/Logo";
export default class LogoNoon extends React.Component<ILogo> {
  render() {
    const src = this.props.src || logo;
    return <img src={src} className="App-logo" alt="logo noon" />;
  }
}
