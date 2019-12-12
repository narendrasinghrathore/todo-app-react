import React, { lazy, useContext } from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

/**
 * Menu icon
 */

import MenuIcon from "@material-ui/icons/Menu";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import IconButton from "@material-ui/core/IconButton";
/**
 * Routing imports
 */
import { RouteConfig } from "../../utils/routes.util";
import { useHistory } from "react-router-dom";
import SuspenseContainer from "../Loader/Loader";
import { MyThemeContext } from "../../context/ThemeManager";
/**
 * Lazy loading imports
 */
const Greet = lazy(() => import("../../components/stateless/Greet/Greet"));

type DrawerSide = "top" | "left" | "bottom" | "right";

export default function NavDrawer() {
  const context = useContext(MyThemeContext);
  const { color }: any = context;
  const name = "Narendra";
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });
  const history = useHistory();
  const toggleDrawer = (side: DrawerSide, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };
  const sideList = (side: DrawerSide) => (
    <div
      style={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <SuspenseContainer>
        <Greet name={name} />
      </SuspenseContainer>
      <List>
        {RouteConfig.map((item, index) => {
          return (
            <ListItem
              onClick={() => history.push(item.path)}
              button
              key={index}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          );
        })}
      </List>
    </div>
  );

  return (
    <div style={{ padding: 10 }}>
      <IconButton onClick={toggleDrawer("left", true)} color={color}>
        {state["left"] ? <MenuOpenIcon /> : <MenuIcon />}
      </IconButton>
      <Drawer open={state.left} onClose={toggleDrawer("left", false)}>
        {sideList("left")}
      </Drawer>
    </div>
  );
}
