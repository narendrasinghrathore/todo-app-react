import React, { useContext } from "react";
import "./Login.css";
import { Theme, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import AccountCircle from "@material-ui/icons/AccountCircle";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import Fab from "@material-ui/core/Fab";
import { MyThemeContext } from "../../../context/ThemeManager";

const useStyles = makeStyles((theme: Theme | any) => ({
  root: (props: any) => ({
    padding: theme.spacing(3, 10),
    margin: "2vw",
    background: `linear-gradient(45deg, ${props.background(
      theme
    )}  30%, #FF8E53 90%)`,
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    flexDirection: "column"
  }),
  margin: {
    margin: theme.spacing(5, 0)
  }
}));
export default function Login() {
  const color: any = useContext(MyThemeContext).color;
  /**
   * Let to set background color based on theme selection color selection
   * i.e primary or secondary
   * @see https://material-ui.com/styles/basics/#adapting-based-on-props
   * @param theme Get theme current instance
   */
  const background = (theme: Theme) => {
    return color === "primary"
      ? theme.palette.secondary.main
      : theme.palette.primary.main;
  };
  const classes = useStyles({ background });
  return (
    <Paper className={classes.root}>
      <Typography variant="h5" component="h3">
        Login to application
      </Typography>
      <Typography component="p">
        Paper can be used to build surface or other elements for your
        application.
      </Typography>
      <div className={classes.margin}>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item sm={1}>
            <AccountCircle color={color} />
          </Grid>
          <Grid item sm={11}>
            <TextField
              fullWidth
              id="input-email"
              label="Email address"
              type="email"
              color={color}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item sm={1}>
            <LockIcon color={color} />
          </Grid>
          <Grid item sm={11}>
            <TextField
              color={color}
              fullWidth
              id="input-password"
              label="Password"
              type="password"
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item sm={12}>
            <Fab
              color={color}
              variant="extended"
              aria-label="add"
              className={classes.margin}
            >
              <LockOpenIcon />
              sign in
            </Fab>
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
}
