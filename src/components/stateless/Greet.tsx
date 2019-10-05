import React from "react";
import { greetUser, IDay } from "../../utils/core.utils";
import { IGreet } from "../../interfaces/Greet";
// logo component(s) import
import Logo from "./Logo";
import LogoNoon from "./LogoNoon";
import LogoNight from "./LogoNight";
export default class Greet extends React.Component<IGreet> {
  render() {
    const message = this.props.name ? `, ${this.props.name}!` : " !!!";
    /// Greet user with appropriate logo based on hour of day
    /// For morning 0, noon 1, evening 2
    let logo;

    switch (greetUser()) {
      case IDay.morning:
        logo = <Logo src="" />;
        break;
      case IDay.noon:
        logo = <LogoNoon src="" />;
        break;
      case IDay.evening:
        logo = <LogoNight src="" />;
        break;
      default:
        logo = <Logo src="" />;
    }

    return (
      <div>
        {logo}
        <h1>Hello there{message}</h1>
      </div>
    );
  }
}
