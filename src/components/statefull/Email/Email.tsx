import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Emailitems from "../../stateless/EmailItems/EmailItems";
import SuspenseContainer from "../../../shared/Loader/Loader";
import ShowEmail from "../../stateless/ShowEmail/ShowEmail";
export default function Email() {
 
  return (
    <Grid container>
      <Grid
        style={{ height: "89vh", overflowX: "hidden", overflowY: "auto" }}
        item
        xs={3}
      >
        <Paper>
          <SuspenseContainer></SuspenseContainer>
          <Emailitems />
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
