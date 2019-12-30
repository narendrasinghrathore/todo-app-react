import React, { Fragment } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { IEmailItem } from "../../../interfaces/EmailItems";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedEmailAction } from "../../../store/actions/email.action";
import { useHistory, useRouteMatch } from "react-router-dom";
import { IState } from "../../../interfaces/State";
import { getSelectedEmail } from "../../../store/selectors/email.selector";
export default function Emailitems({ list }: { list: IEmailItem[] }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { url } = useRouteMatch();
  const selectedEmail = useSelector((state: IState) => getSelectedEmail(state));

  const getEmail = (item: IEmailItem) => {
    //Check if selectedEmail from state and email item clicked from list
    // are not same, if same not action to dispatch
    if (selectedEmail && selectedEmail.id === item.id) {
      return;
    }
    dispatch(
      getSelectedEmailAction(item.id, () => {
        history.push(`${url}/${item.id}`);
      })
    );
  };

  return (
    <List>
      {list.map((item: IEmailItem, index) => (
        <Fragment key={item.id}>
          <ListItem
            style={{
              backgroundColor:
                selectedEmail?.id === item.id ? "#dedede" : "#fff"
            }}
            key={item.id}
            alignItems="flex-start"
            onClick={() => getEmail(item)}
          >
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src={item.avatar} />
            </ListItemAvatar>
            <ListItemText primary={item.subject} />
          </ListItem>
          {list.length - 1 === index ? null : (
            <Divider variant="inset" key={"li" + item.id} component="li" />
          )}
        </Fragment>
      ))}
    </List>
  );
}
