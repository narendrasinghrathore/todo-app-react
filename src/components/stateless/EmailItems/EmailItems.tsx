import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { IEmailItem } from "../../../interfaces/EmailItems";
export default function Emailitems(props: any) {
  const { list }: { list: IEmailItem[] } = props;

  return (
    <List>
      {list.map((item: IEmailItem, index) => (
        <>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src={item.avatar} />
            </ListItemAvatar>
            <ListItemText
              primary={item.subject}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    color="textPrimary"
                  >
                    Content
                  </Typography>
                  {item.description}
                </React.Fragment>
              }
            />
          </ListItem>
          {list.length - 1 === index ? null : (
            <Divider variant="inset" component="li" />
          )}
        </>
      ))}
    </List>
  );
}
