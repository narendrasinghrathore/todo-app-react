import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Avatar, Typography } from "@material-ui/core";
import { getSelectedEmail } from "../../../store/selectors/email.selector";
import { IState } from "../../../interfaces/State";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
export default function ShowEmail(props: any) {
  const defaultStyling = { boxSizing: "border-box", padding: "10px" };
  const selectedEmail = useSelector((state: IState) => getSelectedEmail(state));
  const history = useHistory();
  useEffect(() => {
    // if selectedEmail undefined replace url /email
    if (selectedEmail === undefined) {
      history.replace("/email");
    }
  }, [history, selectedEmail]);
  return (
    <React.Fragment>
      <Grid container item xs={12} spacing={0}>
        <Grid item xs={12}>
          <Paper style={defaultStyling as any} square>
            <Avatar component="span" src={selectedEmail?.avatar}>
              ?
            </Avatar>
            <Typography component="span">From: {selectedEmail?.id}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper style={defaultStyling as any} square>
            <Typography component="h3">
              Subject: {selectedEmail?.subject}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper style={defaultStyling as any} square>
            <Typography component="span" variant="body2" color="textPrimary">
              Content:{" "}
            </Typography>
            {selectedEmail?.description}
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
