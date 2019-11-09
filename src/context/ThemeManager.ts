import React from "react";
import { Colors } from "../interfaces/Themes";

export const themes = {
    color: Colors.default
}

export const MyThemeContext = React.createContext(themes);