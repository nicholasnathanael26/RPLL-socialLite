import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Row, Col, Button, Alert } from "react-bootstrap";
import { URL_API } from "../utils/constant";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import axios from "axios";
import Profile from "../asset/account.svg";
import ModalComment from "../components/modalComment";
import ModalViewFollowing from "../components/modalViewFollowing";
import ModalViewFollower from "../components/modalViewFollower";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

class profileComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        id: "",
        fullname: "",
        birth: "",
        bio: "",
        email: "",
        username: "",
        password: "",
        phoneNumber: "",
        profileImage: null,
      },
      value: 0,
      dataPhoto: [],
      show: false,
      showFollowing: false,
      showFollower: false,
      commnet: "",
      dataComment: [],
      postImage: null,
      id: "",
      page: "profile",
      username: "",
      caption: "",
      dataBookmark: [],
      dataFollowing: [],
      dataFollowers: [],
      listFollowing: [],
      listFollower: [],
    };
  }

  componentDidMount() {
    this.setState({
      data: {
        id: localStorage.getItem("id"),
        fullname: localStorage.getItem("fullname"),
        birth: localStorage.getItem("birth"),
        bio: localStorage.getItem("bio"),
        email: localStorage.getItem("email"),
        username: localStorage.getItem("username"),
        password: localStorage.getItem("password"),
        phoneNumber: localStorage.getItem("phoneNumber"),
        profileImage: localStorage.getItem("profileImage"),
      },
    });

    axios
      .get(URL_API + `api/getPost/${localStorage.getItem("id")}`)
      .then((res) => {
        this.setState({ dataPhoto: res.data });
      });

    axios
      .get(URL_API + `api/GetBookmarkedPost/${localStorage.getItem("id")}`)
      .then((res) => {
        this.setState({ dataBookmark: res.data });
      });

    axios
      .get(URL_API + `api/GetFollower/${localStorage.getItem("id")}`)
      .then((res) => {
        this.setState({ dataFollowers: res.data });
      });

    axios
      .get(URL_API + `api/GetFollowing/${localStorage.getItem("id")}`)
      .then((res) => {
        this.setState({ dataFollowing: res.data });
      });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  closeModal = () => this.setState({ showFollowing: false, showFollower: false });

  handleClose = () =>
    this.setState({
      show: false,
      postImage: null,
      dataComment: [],
      dataModal: [],
      page: "profile",
    });

  handleShow = () => this.setState({ show: true });

  handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(
        URL_API +
        `api/CommentPost/${this.state.id}/${localStorage.getItem("id")}?comment=${this.state.comment}`)
      .then((res) => {
        axios
          .get(URL_API + `api/GetCommentForPost/${this.state.id}`)
          .then((res) => {
            this.setState({
              dataComment: res.data,
              postImage: this.state.postImage,
              show: true,
              id: this.state.id,
              comment: "",
            });
          });
      });
  };

  modalFollowing = () => {
    this.setState({
      showFollowing: true,
      listFollowing: this.state.dataFollowing,
    });
  };

  modalFollower = () => {
    this.setState({
      showFollower: true,
      listFollower: this.state.dataFollowers,
    });
  };

  modal = (data) => {
    axios.get(URL_API + `api/GetCommentForPost/${data.id}`).then((res) => {
      this.setState({
        dataComment: res.data,
        postImage: data.image,
        show: true,
        username: data.owner.username,
        caption: data.caption,
        id: data.id,
      });
    });
  };

  modalBookmark = (data) => {
    axios.get(URL_API + `api/GetCommentForPost/${data.id}`).then((res) => {
      this.setState({
        dataComment: res.data,
        postImage: data.image,
        show: true,
        id: data.id,
        username: data.owner.username,
        caption: data.caption,
        page: "bookmark",
      });
    });
  };

  edit = () => {
    this.props.history.push(`/editpost/${this.state.id}`);
  };

  removeBookmark = () => {
    const data = {
      idPost: this.state.id,
      idMember: localStorage.getItem("id"),
    };
    axios.post(URL_API + `api/RemoveBookmark`, data).then((res) => {
      axios
        .get(URL_API + `api/GetBookmarkedPost/${localStorage.getItem("id")}`)
        .then((res) => {
          this.setState({
            dataBookmark: res.data,
            show: false,
            postImage: null,
            dataComment: [],
            dataModal: [],
            page: "profile",
          });
        });
    });
  };

  render() {
    const style = {
      icon: {
        borderRadius: "55px",
        width: "120px",
        height: "120px",
      },
      button_edit: {
        marginRight: "10px",
        borderRadius: "30px",
      },
      button_logout: {
        borderRadius: "30px",
      },
      margin: {
        marginTop: "100px",
      },
      bio: {
        marginLeft: "3px",
      },
      follow: {
        marginTop: "15px",
      },
      post: {
        width: "200px",
        height: "300px",
        marginBottom: "10px",
      },
      edit: {},
    };

    const useStyles = (theme) => ({
      root: {
        flexGrow: 1,
        width: "100%",
        backgroundColor: theme.palette.background.paper,
      },
    });

    let body;
    let image;
    let imageProfile;
    let bookmark;
    let bio;
    let countPost = 0;
    let countLike = 0;
    let countFollowing = 0;
    let countFollower = 0;

    this.state.dataFollowers.map((follower) => (countFollower += 1));

    this.state.dataFollowing.map((following) => (countFollowing += 1));

    this.state.dataPhoto.map((photo) => (countPost += 1));

    this.state.dataPhoto.map((photo) => (countLike += photo.countLike));

    if (this.state.data.bio !== "null") {
      bio = <p>{this.state.data.bio}</p>;
    } else {
      bio = <p>---</p>;
    }

    if (this.state.dataBookmark !== null) {
      bookmark = this.state.dataBookmark.map((data) => (
        <Button
          variant="outline-light"
          onClick={() => this.modalBookmark(data)}
        >
          <img
            src={`data:image/jpeg;base64,${data.image}`}
            alt="post"
            style={style.post}
          />
        </Button>
      ));
    } else {
      bookmark = (
        <center>
          <p className="text-muted">Nothing's show Bookmark</p>
        </center>
      );
    }

    if (this.state.dataPhoto !== null) {
      image = this.state.dataPhoto.map((data) => (
        <Button variant="outline-light" onClick={() => this.modal(data)}>
          <img
            src={`data:image/jpeg;base64,${data.image}`}
            alt="post"
            style={style.post}
          />
        </Button>
      ));
    } else {
      image = (
        <center>
          <p className="text-muted">Nothing's show Post</p>
        </center>
      );
    }

    if (this.state.data.profileImage !== `data:image/jpeg;base64,null`) {
      imageProfile = (
        <img
          src={localStorage.getItem("profileImage")}
          className="PhotoProfile"
          style={style.icon}
          alt="PhotoProfile"
        />
      );
    } else {
      imageProfile = (
        <img
          src={Profile}
          className="PhotoDefault"
          style={style.icon}
          alt="PhotoDefault"
        />
      );
    }

    const change = (event, newValue) => this.setState({ value: newValue });
    if (this.state.data.id != null) {
      body = (
        <div>
          <Row>
            <Col xs={3}>{imageProfile}</Col>
            <Col xs={5}>
              <h3>{this.state.data.fullname}</h3>
              <p>@{this.state.data.username}</p>
            </Col>
            <Col xs={4}>
              <Row>
                <Link to="/editprofile">
                  <Button variant="dark" style={style.button_edit} size="sm">
                    Edit Profile
                  </Button>
                </Link>
                <Link to="/">
                  <Button
                    variant="secondary"
                    style={style.button_logout}
                    size="sm"
                    onClick={() => localStorage.clear()}
                  >
                    Logout
                  </Button>
                </Link>
              </Row>
            </Col>
          </Row>
          <Row style={style.follow}>
            <Col>
              <Button variant="light" onClick={this.modalFollowing}>
                <p>{countFollowing} Following</p>
              </Button>
              <ModalViewFollowing
                show={this.state.showFollowing}
                onHide={this.closeModal}
                dataFollowing={this.state.listFollowing}
              />
            </Col>
            <Col>
              <Button variant="light" onClick={this.modalFollower}>
                <p>{countFollower} Follower</p>
              </Button>
              <ModalViewFollower
                show={this.state.showFollower}
                onHide={this.closeModal}
                dataFollower={this.state.listFollower}
              />
            </Col>
            <Col>
              <p>{countLike} Like</p>
            </Col>
            <Col>
              <p>{countPost} Post</p>
            </Col>
          </Row>
          <Row style={style.bio}>{bio}</Row>
          <div className={useStyles.root}>
            <Paper position="fixed" color="default">
              <Tabs
                value={this.state.value}
                onChange={change}
                indicatorColor="primary"
                textColor="primary"
                centered
              >
                <Tab label="Profile" {...a11yProps(0)}></Tab>
                <Tab label="Bookmark" {...a11yProps(1)}></Tab>
              </Tabs>
              <TabPanel value={this.state.value} index={0}>
                {image}
              </TabPanel>
              <TabPanel value={this.state.value} index={1}>
                {bookmark}
              </TabPanel>
            </Paper>
            <ModalComment
              show={this.state.show}
              profile={this.state.data.profileImage}
              image={this.state.postImage}
              comment={this.state.dataComment}
              value={this.state.comment}
              post={this.state.id}
              page={this.state.page}
              username={this.state.username}
              caption={this.state.caption}
              removeBookmark={this.removeBookmark}
              showEdit={this.edit}
              onHide={this.handleClose}
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
            />
          </div>
        </div>
      );
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
      );
    }

    return <div>{body}</div>;
  }
}
export default withRouter(profileComponent);
