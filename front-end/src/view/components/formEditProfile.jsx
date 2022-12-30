import React, { Component } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { URL_API } from "../utils/constant";
import Profile from "../asset/account.svg";
import axios from "axios";
import swal from "sweetalert";
import ModalChangeProfile from "./modalChangeProfile";

class formEditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: localStorage.getItem("id"),
      fullname: localStorage.getItem("fullname"),
      bio: localStorage.getItem("bio"),
      email: localStorage.getItem("email"),
      username: localStorage.getItem("username"),
      phoneNumber: localStorage.getItem("phoneNumber"),
      profileImage: localStorage.getItem("profileImage"),
      show: false,
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    console.log(this.state);

    const data = {
      name: this.state.fullname,
      bio: this.state.bio,
      email: this.state.email,
      username: this.state.username,
      phoneNumber: this.state.phoneNumber,
    };

    axios
      .post(URL_API + `api/EditProfile/${this.state.id}`, data)
      .then((res) => {
        swal({
          title: "Sukses Update Profile",
          text: "Sukses Update profile " + this.state.fullname,
          icon: "success",
          button: false,
          timer: 2500,
        });
        localStorage.setItem("fullname", this.state.fullname);
        localStorage.setItem("bio", this.state.bio);
        localStorage.setItem("email", this.state.email);
        localStorage.setItem("username", this.state.username);
        localStorage.setItem("phoneNumber", this.state.phoneNumber);
        this.props.history.push("/profile");
      })
      .catch((error) => {
        swal({
          title: "Gagal Update Profile",
          text: "Gagal Update Profile " + this.state.fullname,
          icon: "error",
          button: false,
          timer: 2500,
        });
      });
  };

  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });

  render() {
    const submit_button = {
      width: "440px",
      marginLeft: "100px",
      marginTop: "50px",
      borderRadius: "20px",
    };
    const form_name = {
      width: "550px",
      marginTop: "40px",
    };
    const form_bio = {
      marginTop: "27px",
    };
    const form_username = {
      marginTop: "27px",
    };
    const form_email = {
      marginTop: "27px",
    };
    const form_phone = {
      marginTop: "27px",
    };
    const style_photo = {
      width: "150px",
      height: "150px",
      borderRadius: "70px",
    };
    const user_name = {
      marginTop: "50px",
    };
    const style = {
      discard_button: {
        marginTop: "10px",
        borderRadius: "20px",
        width: "440px",
        marginLeft: "100px",
      },
    };

    let imageProfile;

    if (
      localStorage.getItem("profileImage") === `data:image/jpeg;base64,null`
    ) {
      imageProfile = (
        <img src={Profile} alt="profileDefault" style={style_photo}></img>
      );
    } else {
      imageProfile = (
        <img
          src={localStorage.getItem("profileImage")}
          alt="profile"
          style={style_photo}
        ></img>
      );
    }

    return (
      <div>
        <Row className="justify-content-md-center" class="mb-5">
          <Col md={{ span: 3, offset: 3 }}>{imageProfile}</Col>
          <Col>
            <h3 style={user_name}> {this.state.fullname} </h3>
            <Button
              variant="light"
              onClick={() => this.setState({ show: true })}
            >
              Change Photo Profile{" "}
            </Button>
            <ModalChangeProfile
              show={this.state.show}
              onHide={this.handleClose}
            />
          </Col>
        </Row>
        <Row className="justify-content-md-center" class="mb-5">
          <Col xs lg="6">
            <Form onSubmit={this.handleSubmit}>
              <Form.Group
                as={Row}
                controlId="formHorizontalUsername"
                style={form_name}
              >
                <Form.Label column sm={2}>
                  Username
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    name="username"
                    defaultValue={this.state.username}
                    placeholder="Masukkan Username"
                    onChange={(event) => this.handleChange(event)}
                  />
                  <Form.Text id="description form username" muted>
                    Help people discover your account by using the name you're
                    known by: either your full name, nickname, or business name.
                  </Form.Text>
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                controlId="formHorizontalName"
                style={form_username}
              >
                <Form.Label column sm={2}>
                  Name
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    name="fullname"
                    placeholder="Masukkan Nama"
                    defaultValue={this.state.fullname}
                    onChange={(event) => this.handleChange(event)}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                controlId="formHorizontalBio"
                style={form_bio}
              >
                <Form.Label column sm={2}>
                  Bio
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    name="bio"
                    as="textarea"
                    rows={3}
                    defaultValue={this.state.bio}
                    onChange={(event) => this.handleChange(event)}
                  ></Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formHorizontalEmail">
                <Form.Label column sm={2}>
                  email
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    name="email"
                    type="email"
                    style={form_email}
                    placeholder="Masukkan Email Baru"
                    defaultValue={this.state.email}
                    onChange={(event) => this.handleChange(event)}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formHorizontalPhone">
                <Form.Label column sm={2}>
                  Phone
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    name="phoneNumber"
                    type="text"
                    style={form_phone}
                    defaultValue={this.state.phoneNumber}
                    placeholder="Masukkan Nomor Telepon"
                    onChange={(event) => this.handleChange(event)}
                  />
                </Col>
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                size="lg"
                style={submit_button}
                block
                rounded
              >
                Submit
              </Button>
            </Form>
            <Link to="/profile">
              <Button
                variant="secondary"
                size="lg"
                style={style.discard_button}
                block
                rounded
              >
                Back
              </Button>
            </Link>
          </Col>
        </Row>
      </div>
    );
  }
}
export default withRouter(formEditProfile);
