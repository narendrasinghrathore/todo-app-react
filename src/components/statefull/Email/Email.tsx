import React, { lazy } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import SuspenseContainer from "../../../shared/Loader/Loader";
const ShowEmail = lazy(() => import("../../stateless/ShowEmail/ShowEmail"));

const Emailitems = lazy(() => import("../../stateless/EmailItems/EmailItems"));

export default function Email() {
  return (
    <Grid container>
      <Grid
        style={{ height: "89vh", overflowX: "hidden", overflowY: "auto" }}
        item
        xs={3}
      >
        <Paper>
          <SuspenseContainer>
            <Emailitems />
          </SuspenseContainer>
        </Paper>
      </Grid>
      <Grid item xs={8}>
        <Paper>
          <SuspenseContainer>
            <ShowEmail />
          </SuspenseContainer>
        </Paper>
      </Grid>
    </Grid>
  );
}
