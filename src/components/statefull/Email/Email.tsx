import React, { lazy } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import SuspenseContainer from "../../../shared/Loader/Loader";
import { Route, Switch, useRouteMatch } from "react-router-dom";

import noMailSelectedImage from "../../../assets/mailbox.svg";
const ShowEmail = lazy(() => import("../../stateless/ShowEmail/ShowEmail"));

const Emailitems = lazy(() => import("../../stateless/EmailItems/EmailItems"));

export default function Email() {
  const { path } = useRouteMatch();
  return (
    <Grid container>
      <Grid
        style={{ height: "89vh", overflowX: "hidden", overflowY: "auto" }}
        item
        xs={3}
      >
        <SuspenseContainer>
          <Paper square>
            <Emailitems />
          </Paper>
        </SuspenseContainer>
      </Grid>
      <Grid item xs={9}>
        <Switch>
          <Route exact path={path}>
            <section
              style={{
                alignContent: " center",
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
                height: "90vh",
                overflowY: "auto",
                backgroundColor: "#f3f3f3"
              }}
            >
              <img
                alt="Select Mail from mailbox left"
                src={noMailSelectedImage}
                style={{ height: "90vh" }}
              />
            </section>
          </Route>
          <Route path={`${path}/:id`}>
            <Paper>
              <SuspenseContainer>
                <ShowEmail />
              </SuspenseContainer>
            </Paper>
          </Route>
        </Switch>
      </Grid>
    </Grid>
  );
}
