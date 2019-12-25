import React, { useEffect, Fragment } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { IEmailItem } from "../../../interfaces/EmailItems";
import { useSelector, useDispatch } from "react-redux";
import { getAllEmails } from "../../../store/selectors/email.selector";
import { IState } from "../../../interfaces/State";
import {
  getEmails,
  loadSelecteEmail
} from "../../../store/actions/email.action";
import { useHistory, useRouteMatch } from "react-router-dom";
export default function Emailitems() {
  const dispatch = useDispatch();
  const history = useHistory();
  const {url} = useRouteMatch();


  const list: IEmailItem[] = useSelector((state: IState) =>
    getAllEmails(state)
  );

  useEffect(() => {
    dispatch(getEmails());
  }, [dispatch]);

  const getEmail = (item: IEmailItem) => {
    dispatch(loadSelecteEmail(item.id));
    history.push(`${url}/${item.id}`);
  };

  return (
    <List>
      {list.map((item: IEmailItem, index) => (
        <Fragment key={item.id}>
          <ListItem
            key={item.id}
            alignItems="flex-start"
            onClick={() => getEmail(item)}
          >
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src={item.avatar} />
            </ListItemAvatar>
            <ListItemText
              primary={item.subject}
             
            />
          </ListItem>
          {list.length - 1 === index ? null : (
            <Divider variant="inset" key={"li" + item.id} component="li" />
          )}
        </Fragment>
      ))}
    </List>
  );
}
