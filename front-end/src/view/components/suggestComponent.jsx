import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { URL_API } from "../utils/constant";
import Sticky from "react-sticky-el";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Profile from "../asset/account.svg";
import axios from "axios";

class suggestComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataAccount: [],
    };
  }

  componentDidMount = () => {
    axios
      .get(URL_API + `api/suggestedAccount/${localStorage.getItem("id")}`)
      .then((res) => {
        this.setState({ dataAccount: res.data });
      });
  };

  search = (username) => {
    this.props.history.push(`/profile/${username}`);
  };

  render() {
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
        width: "230px",
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
      <div className="scrollarea" style={style.sticky}>
        <Sticky>
          <p className="text-muted">SUGGESTED ACCOUNT</p>
          <List dense className={useStyles.root}>
            {this.state.dataAccount.map((data) => (
              <ListItem
                key={data.id}
                button
                style={style.margin}
                onClick={() => this.search(data.username)}
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
        </Sticky>
      </div>
    );
  }
}
export default withRouter(suggestComponent);
