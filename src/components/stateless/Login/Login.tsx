import React, { useContext } from "react";
import "./Login.css";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import AccountCircle from "@material-ui/icons/AccountCircle";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import Fab from "@material-ui/core/Fab";
import { MyThemeContext } from "../../../context/ThemeManager";
//#FE6B8B
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(3, 10),
      margin: "2vw",
      backgroundColor: `linear-gradient(45deg,  #FE6B8B F 30%, #FF8E53 90%)`,
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
      flexDirection: "column",
      backgroundPosition: "center",
      primary: theme.palette.primary.main,
      secondary: theme.palette.secondary.main
    },
    margin: {
      margin: theme.spacing(5, 0)
    }
  })
);
export default function Login() {
  const classes = useStyles();
  const color: any = useContext(MyThemeContext).color;
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
