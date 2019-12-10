import React, { Fragment } from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { useHistory } from "react-router-dom";
import "./Navigation.css";
import { RouteConfig } from "../../../utils/routes.util";

export default function NavigationComponent() {
  const [value, setValue] = React.useState(0);
  const history = useHistory();
  return (
    <Fragment>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          history.push(newValue);
        }}
        showLabels
      >
        {RouteConfig.map((route, index) => (
          <BottomNavigationAction
            key={index}
            icon={route.icon}
            value={route.path}
            label={route.label}
          />
        ))}
      </BottomNavigation>
    </Fragment>
  );
}
