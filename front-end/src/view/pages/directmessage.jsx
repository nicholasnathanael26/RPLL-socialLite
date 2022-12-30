import React, { Component } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import NavbarComponent from "../components/navbarComponent";
import Sticky from "react-sticky-el";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import axios from "axios";
import { URL_API } from "../utils/constant.js";
import Profile from "../asset/account.svg";
import ChatComponent from "../components/chatComponent";
import AddMessage from "../asset/add_circle-24px.svg";
import ModalNewChat from "../components/modalNewChat";

class DirectMessage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listDM: [],
      id: "",
      fullname: "",
      username: "",
      show: false,
      dataFollow: [],
    };
  }

  componentDidMount = () => {
    axios
      .get(URL_API + `api/findAllChatMember/${localStorage.getItem("id")}`)
      .then((res) => {
        this.setState({ listDM: res.data });
      })
      .catch((e) => {
        console.log(e.error);
      });

    axios
      .get(URL_API + `api/GetFollowing/${localStorage.getItem("id")}`)
      .then((res) => {
        this.setState({ dataFollow: res.data });
      });
  };

  handleClose = () => this.setState({ show: false });
  handleOpen = () => this.setState({ show: true });

  openChat = (id, fullname, username) => {
    this.setState({ id: id, fullname: fullname, username: username });
  };

  newChat = (id, fullname, username) => {
    this.setState({ show: false, id: id, fullname: fullname, username: username });
  };

  render() {
    const style = {
      margin: {
        marginBottom: "10px",
        marginLeft: "15px",
      },
      col_left: {
        marginTop: "150px",
      },
      sticky: {
        height: "550px",
        width: "250px",
        overflow: "scroll",
        position: "fixed",
      },
      tulisanDirectMessage: {
        marginLeft: "20px",
      },
    };

    const useStyles = (theme) => ({
      root: {
        width: "100%",
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
      },
    });

    let body;

    if (localStorage.getItem('id') !== null) {
      body = (
        <Container>
          <NavbarComponent />
          <Row style={style.col_left}>
            <Col sm="3">
              <div className="scrollarea" style={style.sticky}>
                <Sticky>
                  <List dense className={useStyles.root}>
                    <Row style={style.tulisanDirectMessage}>
                      <p className="text-muted">DIRECT MESSAGE</p>
                    </Row>
                    {this.state.listDM.map((data) => (
                      <ListItem
                        key={data.id}
                        button
                        style={style.margin}
                        onClick={() => this.openChat(data.id, data.fullname, data.username)}
                      >
                        <ListItemAvatar>
                          <Avatar
                            alt="list"
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
                    <ListItem
                      button
                      style={style.margin}
                      onClick={this.handleOpen}
                    >
                      <ListItemAvatar>
                        <Avatar alt="add" src={AddMessage} />
                      </ListItemAvatar>
                      <ListItemText primary={"Start New Message"} />
                    </ListItem>
                    <ModalNewChat
                      show={this.state.show}
                      dataFollowing={this.state.dataFollow}
                      onHide={this.handleClose}
                      newChat={this.newChat}
                    />
                  </List>
                </Sticky>
              </div>
            </Col>
            <Col sm={8}>
              <ChatComponent id={this.state.id} fullname={this.state.fullname} username={this.state.username} />
            </Col>
          </Row>
        </Container>
      )
    } else {
      body = (
        <Col className="justify-content-md-center" style={style.margin}>
          <h2>Access Denied !!</h2>
          <Alert key="1" variant="danger">
            Kamu masih menjadi user{" "}
            <Alert.Link href="/signup">klik disini</Alert.Link> untuk signUp
            atau dapat kembali ke beranda{" "}
            <Alert.Link href="/">klik disini</Alert.Link>
          </Alert>
        </Col>
      )
    }

    return (
      <div>
        {body}
      </div>
    );
  }
}

export default DirectMessage;
