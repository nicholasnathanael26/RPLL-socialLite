import React, { Component } from "react";
import { Row, Col, Card, Alert } from "react-bootstrap";
import { URL_API } from "../utils/constant";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Comment from "../asset/textsms-24px.svg";
import Like from "../asset/heart-red.gif";
import DefaultLike from "../asset/heart.png";
import ModalComment from "./modalComment";
import axios from "axios";
import Profile from "../asset/account.svg";
import Bookmark from "../asset/bookmark.svg";
import AddBookmark from "../asset/bookmark_add.svg";

class postComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      dataPost: [],
      show: false,
      dataComment: [],
      profile: null,
      postImage: null,
      like: [],
      comment: "",
      page: "post",
      caption: "",
      username: "",
      dataBookmark: [],
      dataFollow: [],
    };
  }

  componentDidMount = () => {
    axios
      .get(URL_API + `api/getPostForMember/${localStorage.getItem("id")}`)
      .then((res) => {
        this.setState({ dataPost: res.data });
      });

    this.setState({
      profile: localStorage.getItem("profileImage"),
    });

    axios
      .get(URL_API + `api/GetLikedPost/${localStorage.getItem("id")}`)
      .then((res) => {
        this.setState({ like: res.data });
      });

    axios
      .get(URL_API + `api/GetBookmarkedPost/${localStorage.getItem("id")}`)
      .then((res) => {
        this.setState({ dataBookmark: res.data });
      });

    axios
      .get(URL_API + `api/GetFollowing/${localStorage.getItem("id")}`)
      .then((res) => {
        this.setState({ dataFollow: res.data });
      });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleClose = () =>
    this.setState({
      show: false,
      postImage: null,
      dataComment: [],
      dataModal: [],
      caption: "",
      username: "",
      comment: ""
    });
  handleShow = () => this.setState({ show: true });

  handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(URL_API + `api/CommentPost/${this.state.id}/${localStorage.getItem("id")}?comment=${this.state.comment}`)
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

  likePost = (idPost, idMember) => {
    if (this.state.like.find((v) => v === idPost) === idPost) {
      this.unlike(idPost, idMember);
    } else {
      this.like(idPost, idMember);
    }
  };

  like = (idPost, idMember) => {
    axios.post(URL_API + `api/LikePost/${idPost}/${idMember}`).then((res) => {
      axios
        .get(URL_API + `api/GetLikedPost/${localStorage.getItem("id")}`)
        .then((res) => {
          this.setState({ like: res.data });
        });
    });
  };

  unlike = (idPost, idMember) => {
    axios.post(URL_API + `api/UnlikePost/${idPost}/${idMember}`).then((res) => {
      axios
        .get(URL_API + `api/GetLikedPost/${localStorage.getItem("id")}`)
        .then((res) => {
          this.setState({ like: res.data });
        });
    });
  };

  comment = (data) => {
    axios.get(URL_API + `api/GetCommentForPost/${data.id}`).then((res) => {
      this.setState({
        dataComment: res.data,
        postImage: data.image,
        show: true,
        id: data.id,
        caption: data.caption,
        username: data.owner.username
      });
    });
  };

  actionBookmark = (idPost, idMember) => {
    if (this.state.dataBookmark.find((v) => v.id === idPost)) {
      this.removeBookmark(idPost, idMember);
    } else {
      this.addBookmark(idPost, idMember);
    }
  };

  removeBookmark = (idPost, idMember) => {
    const data = {
      idPost: idPost,
      idMember: idMember,
    };
    axios.post(URL_API + `api/RemoveBookmark`, data).then((res) => {
      axios.get(URL_API + `api/GetBookmarkedPost/${idMember}`).then((res) => {
        this.setState({ dataBookmark: res.data });
      });
    });
  };

  addBookmark = (idPost, idMember) => {
    const data = {
      idPost: idPost,
      idMember: idMember,
    };
    axios.post(URL_API + `api/AddBookmark`, data).then((res) => {
      axios.get(URL_API + `api/GetBookmarkedPost/${idMember}`).then((res) => {
        this.setState({ dataBookmark: res.data });
      });
    });
  };

  follow = (id) => {
    axios
      .post(URL_API + `api/follow/${localStorage.getItem("id")}/${id}`)
      .then((res) => {
        axios
          .get(URL_API + `api/GetFollowing/${localStorage.getItem("id")}`)
          .then((res) => {
            this.setState({ dataFollow: res.data });
          });
      });
  };

  search = (username) => {
    this.props.history.push(`/profile/${username}`);
  }

  render() {
    const style = {
      logo_home: {
        width: "50px",
        height: "50px",
        marginRight: "10px",
      },
      column_kiri: {
        marginTop: "150px",
        marginRight: "90px",
        fixed: "top",
      },
      tulisanHOME: {
        marginTop: "10px",
      },
      tulisanSocialStory: {
        marginLeft: "15px",
        marginTop: "50px",
      },
      storyIcon: {
        borderRadius: "55px",
        width: "50px",
        height: "50px",
        marginTop: "10px",
      },
      textStory: {
        marginTop: "30px",
        marginLeft: "12px",
      },
      column_tengah: {
        marginTop: "150px",
      },
      column_kanan: {
        marginTop: "150px",
        marginLeft: "80px",
      },
      iconPostingan: {
        borderRadius: "55px",
        width: "60px",
        height: "60px",
      },
      marginIconPostingan: {
        marginTop: "7px",
        marginLeft: "10px",
        marginBottom: "7px",
      },
      textNamaPost: {
        marginTop: "10px",
        marginLeft: "15px",
        fontSize: "22px",
      },
      jarakPerPostingan: {
        marginBottom: "30px",
      },
      comment: {
        marginLeft: "-20px",
        marginTop: "15px",
        width: "40px",
        height: "40px",
      },
      jumlahComment: {
        marginTop: "-10px",
      },
      ukuranFoto: {
        width: "450px",
        height: "400px",
      },
      like: {
        marginLeft: "-20px",
        width: "40px",
        height: "40px",
      },
      jumlahLike: {
        marginTop: "-10px",
        marginRight: "-7px",
      },
      bookmark: {
        marginLeft: "-20px",
        width: "40px",
        height: "40px",
      },
      goBottom: {
        marginTop: "200px",
      },
      buttonFollow: {
        marginLeft: "30px",
      },
      username: {
        marginLeft: "100px",
        marginTop: "-35px",
      },
      alert: {
        marginTop: "100px",
      },
      caption: {
        marginTop: "-10px",
        fontSize: "15px",
        marginLeft: "80px"
      }
    };

    let body;

    if (this.state.dataPost !== null) {
      body = (
        <div>
          {this.state.dataPost.map((data) => (
            <Row style={style.jarakPerPostingan}>
              <Card border="light" style={{ width: "35rem", height: "35rem" }}>
                <Row style={style.marginIconPostingan}>
                  <Button onClick={() => this.search(data.owner.username)}>
                    <Card.Img
                      src={
                        data.owner.profileImage !== null
                          ? `data:image/jpeg;base64,${data.owner.profileImage}`
                          : Profile
                      }
                      style={style.iconPostingan}
                      alt="icon"
                    />
                  </Button>
                  <b style={style.textNamaPost}>{data.owner.fullname}</b>
                  {this.state.dataFollow.find((f) => f.id === data.owner.id) ? (
                    ""
                  ) : (
                    // eslint-disable-next-line
                    data.owner.id == localStorage.getItem('id') ?
                      ""
                      :
                      <Button
                        onClick={() => this.follow(data.owner.id)}
                        style={style.buttonFollow}
                      >
                        FOLLOW
                    </Button>
                  )}
                </Row>
                <Row style={style.username}>@{data.owner.username}</Row>
                <Card.Body>
                  <Card.Text className="text-muted" style={style.caption}>{data.caption}</Card.Text>
                  <Row>
                    <Col>
                      <Card.Img
                        src={`data:image/jpeg;base64,${data.image}`}
                        style={style.ukuranFoto}
                      />
                    </Col>

                    {/* action dari gambar postingannya */}
                    <Col>
                      <Row>
                        <Button>
                          <img
                            onClick={() => this.actionBookmark(data.id, localStorage.getItem("id"))}
                            src={
                              this.state.dataBookmark.find(
                                (b) => b.id === data.id)
                                ? Bookmark
                                : AddBookmark
                            }
                            alt="story"
                            style={style.bookmark}
                          ></img>
                        </Button>
                      </Row>
                      <Row style={style.goBottom}>
                        <Button variant="outline-light">
                          <img
                            onClick={() =>
                              this.likePost(data.id, localStorage.getItem("id"))
                            }
                            src={
                              this.state.like.find((v) => v === data.id)
                                ? Like
                                : DefaultLike
                            }
                            alt="like"
                            style={style.like}
                          ></img>
                        </Button>
                      </Row>
                      <Row>
                        <Button variant="outline-light">
                          <img
                            src={Comment}
                            onClick={() => this.comment(data)}
                            alt="comment"
                            style={style.comment}
                          ></img>
                        </Button>
                        <ModalComment
                          show={this.state.show}
                          profile={this.state.profile}
                          image={this.state.postImage}
                          comment={this.state.dataComment}
                          value={this.state.comment}
                          post={this.state.id}
                          page={this.state.page}
                          caption={this.state.caption}
                          username={this.state.username}
                          onHide={this.handleClose}
                          handleSubmit={this.handleSubmit}
                          handleChange={this.handleChange}
                        />
                      </Row>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Row>
          ))}
        </div>
      );
    } else {
      body = (
        <Col className="justify-content-md-center" style={style.alert}>
          <h2>Tidak Ada Post</h2>
          <Alert key="2" variant="success">
            Silahkan <Alert.Link href="/signup">Signup</Alert.Link> Atau{" "}
            <Alert.Link href="/login">Login</Alert.Link>
          </Alert>
        </Col>
      );
    }
    return <div>{body}</div>;
  }
}
export default withRouter(postComponent);
