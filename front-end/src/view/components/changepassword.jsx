import React, { Component } from "react";
import { Link, Switch, withRouter } from "react-router-dom";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import { URL_API } from "../utils/constant";
import NavbarComponent from "./navbarComponent";
import axios from "axios";
import swal from "sweetalert";

class ChangePassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: localStorage.getItem("id"),
      password: "",
      newPassword: "",
      reTypePassword: "",
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      oldPassword: this.state.password,
      newPassword: this.state.newPassword,
      reTypeNewPassword: this.state.reTypePassword,
    };
    axios
      .post(URL_API + `api/ChangePassword/${this.state.id}`, data)
      .then((res) => {
        swal({
          title: "Sukses Update Password",
          text: "Sukses Update Password ",
          icon: "success",
          button: false,
          timer: 2500,
        });
        localStorage.setItem("password", this.state.newPassword);
        this.props.history.push("/profile");
      })
      .catch((error) => {
        const errorMessage = JSON.parse(error.request.response);
        swal({
          title: "Failed Update Password",
          text: "Failed Update Password, " + errorMessage.message,
          icon: "error",
          button: true,
          timer: 3500,
        });
        this.setState({
          password: "",
          newPassword: "",
          reTypePassword: "",
        });
      });
  };

  render() {
    const submit_button = {
      width: "250px",
      marginLeft: "100px",
      marginTop: "50px",
      borderRadius: "20px",
    };
    const h2 = {
      marginTop: "50px",
      marginLeft: "100px",
    };

    const form_username = {
      marginTop: "27px",
    };

    const style = {
      cancel_button: {
        marginTop: "10px",
        borderRadius: "20px",
        width: "250px",
        marginLeft: "100px",
      },
    };
    return (
      <main>
        <Switch>
          <NavbarComponent />
        </Switch>
        <Container>
          <Row className="justify-content-md-center" class="mb-5">
            <Col xs lg="6">
              <Row>
                <Col>
                  <h2 style={h2}>Change Password</h2>
                </Col>
              </Row>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group
                  as={Row}
                  controlId="formHorizontalOld"
                  style={form_username}
                >
                  <Form.Label column sm={5}>
                    <b>Old Password</b>
                  </Form.Label>
                  <Col sm={14}>
                    <Form.Control
                      name="password"
                      type="password"
                      value={this.state.password}
                      onChange={(event) => this.handleChange(event)}
                      placeholder="Current Password"
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  controlId="formHorizontalNew"
                  style={form_username}
                >
                  <Form.Label column sm={5}>
                    <b>New Password</b>
                  </Form.Label>
                  <Col sm={14}>
                    <Form.Control
                      name="newPassword"
                      type="password"
                      value={this.state.newPassword}
                      onChange={(event) => this.handleChange(event)}
                      placeholder="Insert New Password"
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  controlId="formHorizontalRetype"
                  style={form_username}
                >
                  <Form.Label column sm={5}>
                    <b>Retype New Password</b>
                  </Form.Label>
                  <Col sm={14}>
                    <Form.Control
                      name="reTypePassword"
                      type="password"
                      value={this.state.reTypePassword}
                      onChange={(event) => this.handleChange(event)}
                      placeholder="Insert Retype Password"
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
                  Change Password
                </Button>
              </Form>
              <Link to="/profile">
                <Button
                  variant="secondary"
                  size="lg"
                  style={style.cancel_button}
                  block
                  rounded
                >
                  Back
                </Button>
              </Link>
            </Col>
          </Row>
        </Container>
      </main>
    );
  }
}
export default withRouter(ChangePassword);
