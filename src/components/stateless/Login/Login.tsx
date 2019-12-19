import React, { useContext, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../../store/actions/login.action";
import { loginProcessSelector } from "../../../store/selectors/login.selector";
import { IState } from "../../../interfaces/State";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useLocation } from "react-router-dom";

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
  const dispatch = useDispatch();

  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };
  

  const loginInProcess = useSelector((state: IState) =>
    loginProcessSelector(state)
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    // dispatch(loginAction({ email, password }).then(() => {

    // });
  };

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
        <form>
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
                onChange={e => setEmail(e.target.value)}
                disabled={loginInProcess}
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
                disabled={loginInProcess}
                onChange={e => setPassword(e.target.value)}
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
                onClick={onSubmit}
                disabled={loginInProcess}
              >
                {loginInProcess ? (
                  <CircularProgress
                    style={{ marginRight: "5px" }}
                    size={24}
                    color={color}
                  />
                ) : (
                  <LockOpenIcon style={{ marginRight: "5px" }} />
                )}
                sign in
              </Fab>
            </Grid>
          </Grid>
        </form>
      </div>
    </Paper>
  );
}
