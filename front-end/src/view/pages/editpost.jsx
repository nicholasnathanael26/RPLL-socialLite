import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { URL_API } from "../utils/constant.js";
import Logo from "../asset/logo.png";
import axios from "axios";
import Profile from "../asset/account.svg";
import swal from "sweetalert";

function EditPost(props) {
  const { id } = props.match.params;
  const [dataPost, setData] = useState({});
  const [caption, setCaption] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(URL_API + `api/getPostByIdPost/${id}`);
        setData(response.data);
        setCaption(response.data.caption);
      } catch (error) {
        console.log("error");
      }
    }
    fetchData();
  }, [id]);

  const handleChange = (event) => {
    setCaption(event.target.value);
    console.log(caption);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(URL_API + `api/editCaption/${id}?caption=${caption}`)
      .then((res) => {
        swal({
          title: "Sukses Update Post",
          text: "Sukses Update Caption ",
          icon: "success",
          button: false,
          timer: 2500,
        });
      })
      .catch((error) => {
        swal({
          title: "Failed Update Post",
          text: "Failed Update Caption ",
          icon: "error",
          button: false,
          timer: 2500,
        });
      });
  };

  const style = {
    logo: {
      marginTop: "20px",
      width: "120px",
      height: "100px",
    },
    judul: {
      marginTop: "70px",
      marginLeft: "-90px",
    },
    hr: {
      border: "1px solid",
    },
    body: {
      marginTop: "90px",
    },
    profile: {
      borderRadius: "70px",
      width: "40px",
      height: "40px",
      marginRight: "40px",
    },
    columnKanan: {
      marginTop: "50px",
      marginLeft: "40px",
    },
    uploadButton: {
      width: "200px",
      marginTop: "40px",
    },
    buttonGoBack: {
      marginTop: "350px",
      marginLeft: "40px",
    },
    iconUpload: {
      width: "40px",
      height: "40px",
      marginBottom: "10px",
      marginLeft: "15px",
    },
    text: {
      marginTop: "5px",
      marginLeft: "5px",
    },
    imagePost: {
      width: "450px",
      height: "400px",
      marginBottom: "100px",
    },
  };

  return (
    <Container>
      <div>
        <Row>
          <Col>
            <Link to="/">
              <img src={Logo} className="logo" style={style.logo} alt="Logo" />
            </Link>
          </Col>
          <Col>
            <b>
              <h2 style={style.judul}>Edit Post</h2>
            </b>
          </Col>
        </Row>
        <hr style={style.hr} />
        <Row style={style.body}>
          <Col>
            <h3>EDIT YOUR POST</h3>
            <Link to="/profile">
              <Button
                variant="light"
                type="submit"
                size="lg"
                style={style.buttonGoBack}
              >
                &#60; Back To Profile
              </Button>
            </Link>
          </Col>
          <Col>
            <img
              src={`data:image/jpeg;base64,${dataPost.image}`}
              alt="post"
              style={style.imagePost}
            ></img>
          </Col>
          <Col>
            <Row>
              <img
                src={
                  localStorage.getItem("profileImage") ===
                  `data:image/jpeg;base64,null`
                    ? Profile
                    : localStorage.getItem("profileImage")
                }
                alt="profile"
                style={style.profile}
              ></img>
              <Form onSubmit={handleSubmit}>
                <Form.Control
                  name="caption"
                  as="textarea"
                  rows={3}
                  defaultValue={caption}
                  placeholder="Write Caption"
                  onChange={(event) => handleChange(event)}
                  required
                />
                <hr style={style.hr} />
                <Button
                  variant="secondary"
                  type="submit"
                  size="lg"
                  style={style.uploadButton}
                  block
                  rounded
                >
                  Save Changes
                </Button>
              </Form>
            </Row>
          </Col>
        </Row>
      </div>
    </Container>
  );
}
export default withRouter(EditPost);
