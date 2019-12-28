import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Avatar, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { IEmailItem } from "../../../interfaces/EmailItems";

export default function ShowEmail(props: any) {
  const { selectedEmail }: { selectedEmail: IEmailItem } = props;
  const defaultStyling = { boxSizing: "border-box", padding: "10px" };
  const history = useHistory();

  useEffect(() => {
    if (selectedEmail === undefined) {
      history.replace("/email");
    }
  }, [selectedEmail, history]);

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
