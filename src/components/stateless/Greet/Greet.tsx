import React, { useContext } from "react";
import { greetUser, IDay } from "../../../utils/core.utils";
import { IGreet } from "../../../interfaces/Greet";
// logo component(s) import
import Logo from "../Logo/Logo";

// logos
import logoNight from "../../../assets/night.svg";
import logoNoon from "../../../assets/noon.svg";
// css
import "./Greet.css";
import { MyThemeContext } from "../../../context/ThemeManager";

export default function Greet(props: IGreet) {
  // Get context
  const context = useContext(MyThemeContext);
  // get color from MyThemeContext
  const { color }: any = context;
  // based on theme, update the background color of greet div
  const backgroundColor = (color_: string) => {
    switch (color_) {
      case "primary":
        return "#3f51b5";
      case "secondary":
        return "#f50057";
      default:
        return "#3f51b5";
    }
  };
  /// Greet user with appropriate logo based on hour of day
  /// For morning 0, noon 1, evening 2
  const message = props.name ? `, ${props.name}!` : " !!!";

  // update logo based on time of day
  const setLogo = () => {
    switch (greetUser()) {
      case IDay.morning:
        return <Logo src="" alt="logo morning" />;

      case IDay.noon:
        return <Logo src={logoNoon} alt="logo afternoon" />;

      case IDay.evening:
        return <Logo src={logoNight} alt="logo night" />;

      default:
        return <Logo src="" alt="logo" />;
    }
  };

  return (
    <div
      style={{ backgroundColor: backgroundColor(color) }}
      className="container"
    >
      {setLogo()}
      <h1>Hello there{message}</h1>
    </div>
  );
}
