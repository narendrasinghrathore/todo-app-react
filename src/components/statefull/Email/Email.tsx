import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Emailitems from "../../stateless/EmailItems/EmailItems";
import { IEmailItem } from "../../../interfaces/EmailItems";
import SuspenseContainer from "../../../shared/Loader/Loader";
import ShowEmail from "../../stateless/ShowEmail/ShowEmail";
export default function Email() {
  const list: IEmailItem[] = [
    {
      id: 1,
      subject: "accusamus beatae ad facilis cum similique qui sunt",
      description: "https://via.placeholder.com/600/92c952",
      avatar: "https://via.placeholder.com/150/92c952"
    },
    {
      id: 2,
      subject: "reprehenderit est deserunt velit ipsam",
      description: "https://via.placeholder.com/600/771796",
      avatar: "https://via.placeholder.com/150/771796"
    },
    {
      id: 3,
      subject: "officia porro iure quia iusto qui ipsa ut modi",
      description: "https://via.placeholder.com/600/24f355",
      avatar: "https://via.placeholder.com/150/24f355"
    },
    {
      id: 4,
      subject: "culpa odio esse rerum omnis laboriosam voluptate repudiandae",
      description: "https://via.placeholder.com/600/d32776",
      avatar: "https://via.placeholder.com/150/d32776"
    },
    {
      id: 5,
      subject: "natus nisi omnis corporis facere molestiae rerum in",
      description: "https://via.placeholder.com/600/f66b97",
      avatar: "https://via.placeholder.com/150/f66b97"
    },
    {
      id: 6,
      subject: "accusamus ea aliquid et amet sequi nemo",
      description: "https://via.placeholder.com/600/56a8c2",
      avatar: "https://via.placeholder.com/150/56a8c2"
    },
    {
      id: 7,
      subject:
        "officia delectus consequatur vero aut veniam explicabo molestias",
      description: "https://via.placeholder.com/600/b0f7cc",
      avatar: "https://via.placeholder.com/150/b0f7cc"
    },
    {
      id: 8,
      subject: "aut porro officiis laborum odit ea laudantium corporis",
      description: "https://via.placeholder.com/600/54176f",
      avatar: "https://via.placeholder.com/150/54176f"
    },
    {
      id: 9,
      subject: "qui eius qui autem sed",
      description: "https://via.placeholder.com/600/51aa97",
      avatar: "https://via.placeholder.com/150/51aa97"
    },
    {
      id: 10,
      subject: "beatae et provident et ut vel",
      description: "https://via.placeholder.com/600/810b14",
      avatar: "https://via.placeholder.com/150/810b14"
    },
    {
      id: 11,
      subject: "nihil at amet non hic quia qui",
      description: "https://via.placeholder.com/600/1ee8a4",
      avatar: "https://via.placeholder.com/150/1ee8a4"
    },
    {
      id: 12,
      subject:
        "mollitia soluta ut rerum eos aliquam consequatur perspiciatis maiores",
      description: "https://via.placeholder.com/600/66b7d2",
      avatar: "https://via.placeholder.com/150/66b7d2"
    }
  ];
  return (
    <Grid container>
      <Grid
        style={{ height: "89vh", overflowX: "hidden", overflowY: "auto" }}
        item
        xs={3}
      >
        <Paper>
          <Emailitems list={list} />
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
