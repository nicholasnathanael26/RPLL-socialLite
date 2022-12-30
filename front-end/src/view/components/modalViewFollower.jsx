import React from "react";
import { Modal, Button } from "react-bootstrap";
import { withRouter, useHistory } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Profile from "../asset/account.svg";

function ModalViewFollower(props) {
  let history = useHistory();

  const search = (username) => {
    history.push(`/profile/${username}`);
  };

  const style = {
    storyIcon: {
      borderRadius: "55px",
      width: "50px",
      height: "50px",
    },
    textStory: {
      marginTop: "15px",
      marginLeft: "12px",
    },
    sticky: {
      height: "350px",
      width: "470px",
      overflow: "scroll",
      position: "fixed",
    },
    margin: {
      marginBottom: "15px",
    },
  };

  const useStyles = (theme) => ({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  });
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header>
        <h2>Follower</h2>
      </Modal.Header>
      <Modal.Body className="show-grid" closeButton>
        <List dense className={useStyles.root}>
          {props.dataFollower.map((data) => (
            <ListItem
              key={data.id}
              button
              style={style.margin}
              onClick={() => search(data.username)}
            >
              <ListItemAvatar>
                <Avatar
                  alt="story"
                  src={
                    data.profileImage !== null
                      ? `data:image/jpeg;base64,${data.profileImage}`
                      : Profile
                  }
                />
              </ListItemAvatar>
              <ListItemText primary={data.fullname} />
            </ListItem>
          ))}
        </List>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={props.onHide} variant="secondary">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default withRouter(ModalViewFollower);
