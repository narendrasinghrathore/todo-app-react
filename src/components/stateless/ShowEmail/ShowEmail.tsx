import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
export default function ShowEmail() {
  return (
    <React.Fragment>
      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={3}>
          <Grid item xs={4}>
            <Paper>item</Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper>item</Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper>item</Paper>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
