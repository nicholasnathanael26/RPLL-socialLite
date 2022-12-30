import React, { Component } from "react";
import { Row, Col, Card, Alert } from "react-bootstrap";
import { URL_API } from "../utils/constant";
import Button from "@material-ui/core/Button";
import Comment from "../asset/textsms-24px.svg";
import Like from "../asset/favorite-24px.svg";
import Bookmark from "../asset/bookmark_add-24px.svg";
import Tooltip from "@material-ui/core/Tooltip";
import axios from "axios";
import Profile from "../asset/account.svg";

class postGuestComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataPost: [],
    };
  }

  componentDidMount = () => {
    axios.get(URL_API + `api/getPostForUser`).then((res) => {
      this.setState({ dataPost: res.data });
    });
  };
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
        marginTop: "10px",
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
      username: {
        marginLeft: "85px",
        marginTop: "-35px",
      },
      alert: {
        marginTopt: "100px",
      },
      caption: {
        marginTop: "-10px",
        fontSize: "15px",
        marginLeft: "65px"
      }
    };

    let body;

    if (this.state.dataPost !== null) {
      body = this.state.dataPost.map((data) => (
        <Row style={style.jarakPerPostingan}>
          <Card border="light" style={{ width: "35rem", height: "35rem" }}>
            <Row style={style.marginIconPostingan}>
              <Card.Img
                src={
                  data.owner.profileImage !== null
                    ? `data:image/jpeg;base64,${data.owner.profileImage}`
                    : Profile
                }
                style={style.iconPostingan}
                alt="Profile"
              />
              <b style={style.textNamaPost}>{data.owner.fullname}</b>
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
                    <Tooltip
                      title="Kamu belum bisa bookmark, silahkan login dulu"
                      arrow
                    >
                      <span>
                        <Button disabled>
                          <img
                            src={Bookmark}
                            alt="story"
                            style={style.bookmark}
                          ></img>
                        </Button>
                      </span>
                    </Tooltip>
                  </Row>
                  <Row style={style.goBottom}>
                    <Tooltip
                      title="Kamu belum bisa Like, silahkan login dulu"
                      arrow
                      placement="top"
                    >
                      <span>
                        <Button disabled>
                          <img src={Like} alt="like" style={style.like}></img>
                        </Button>
                      </span>
                    </Tooltip>
                  </Row>
                  {/* disini buat angka like nya */}
                  <Row style={style.jumlahLike}>
                    <p>{data.countLike}</p>
                  </Row>
                  <Row>
                    <Tooltip
                      title="Kamu belum bisa Comment, silahkan login dulu"
                      arrow
                      placement="bottom"
                    >
                      <span>
                        <Button disabled>
                          <img
                            src={Comment}
                            alt="comment"
                            style={style.comment}
                          ></img>
                        </Button>
                      </span>
                    </Tooltip>
                  </Row>
                  {/* disini buat angka comment nya */}
                  <Row style={style.jumlahComment}>
                    <p>{data.countComment}</p>
                  </Row>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Row>
      ));
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
export default postGuestComponent;
