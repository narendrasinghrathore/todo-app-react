import React from "react";
import { greetUser, IDay } from "../../../utils/core.utils";
import { IGreet } from "../../../interfaces/Greet";
// logo component(s) import
import Logo from "../Logo/Logo";

// logos
import logoNight from "../../../assets/night.svg";
import logoNoon from "../../../assets/noon.svg";
// css
import './Greet.css';

export default class Greet extends React.Component<IGreet> {
  message: string;
  /// Greet user with appropriate logo based on hour of day
  /// For morning 0, noon 1, evening 2
  logo: any;

  constructor(props: any) {
    super(props);
    this.message = this.props.name ? `, ${this.props.name}!` : " !!!";
    this.setLogo();
  }

  setLogo = () => {
    switch (greetUser()) {
      case IDay.morning:
        this.logo = <Logo src="" alt="logo morning" />;
        break;
      case IDay.noon:
        this.logo = <Logo src={logoNoon} alt="logo afternoon" />;
        break;
      case IDay.evening:
        this.logo = <Logo src={logoNight} alt="logo night" />;
        break;
      default:
        this.logo = <Logo src="" alt="logo" />;
    }
  };

  render() {
    return (
      <div className="container">
        {this.logo}
        <h1>Hello there{this.message}</h1>
      </div>
    );
  }
}
