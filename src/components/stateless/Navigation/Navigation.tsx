import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { useHistory } from 'react-router-dom';
import './Navigation.css';
import { RouteConfig } from '../../../utils/routes.util';

const useStyles = makeStyles({
  root: {
    width: '100vw'
  }
});

export default function NavigationComponent() {
  const classes = useStyles();
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
        className={classes.root}
      >
        {RouteConfig.map((route, index) => (
          <BottomNavigationAction key={index}
            icon={route.icon}
            value={route.path}
            label={route.label}
          />
        ))}
      </BottomNavigation>
    </Fragment>
  );
}
