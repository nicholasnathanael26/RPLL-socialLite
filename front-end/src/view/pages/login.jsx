import React, { Component } from "react";
import { Form, Container, Row, Col, Button, Alert } from "react-bootstrap";
import { URL_API } from "../utils/constant.js";
import { Link, withRouter } from "react-router-dom";
import Logo from "../asset/logo.png";
import axios from "axios";
import swal from "sweetalert";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      username: "",
      password: "",
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const dataLogin = {
      username: this.state.username,
      password: this.state.password,
    };

    axios
      .post(URL_API + "api/Login", dataLogin)
      .then((res) => {
        swal({
          title: "Sukses Login",
          text: "Sukses Login, Selamat datang " + res.data.fullname + "!!",
          icon: "success",
          button: false,
          timer: 2500,
        });
        localStorage.setItem("id", res.data.id);
        localStorage.setItem("fullname", res.data.fullname);
        localStorage.setItem("birth", res.data.birth);
        localStorage.setItem("bio", res.data.bio);
        localStorage.setItem("email", res.data.email);
        localStorage.setItem("username", res.data.username);
        localStorage.setItem("password", res.data.password);
        localStorage.setItem("phoneNumber", res.data.phoneNumber);
        localStorage.setItem("profileImage",`data:image/jpeg;base64,${res.data.profileImage}`
        );
        this.props.history.push("/");
      })
      .catch((error) => {
        const errorMessage = JSON.parse(error.request.response);
        swal({
          title: "Gagal Login",
          text: "Gagal Login " + errorMessage.message,
          icon: "error",
          button: false,
          timer: 2500,
        });
        this.props.history.push("/login");
      });

    this.setState({
      username: "",
      password: "",
    });
  };

  render() {
    const style = {
      hr: {
        marginTop: "80px",
      },
      logo: {
        marginTop: "20px",
        width: "120px",
        height: "100px",
      },
      goHome: {
        marginTop: "50px",
        textDecoration: "none",
        fontSize: "18px",
      },
      form: {
        marginTop: "50px",
      },
      login: {
        marginLeft: "30px",
        marginTop: "20px",
        marginBottom: "20px",
      },
      margin: {
        marginTop: "150px",
      },
    };

    let bodyLogin;

    if (localStorage.getItem("username") === null) {
      bodyLogin = (
        <Container>
          <Row>
            <Col>
              <img src={Logo} className="logo" style={style.logo} alt="Logo" />
            </Col>
          </Row>
          <Row>
            <Col>
              <h2 className="justify-content-md-between" style={style.login}>
                Log In
              </h2>
            </Col>
          </Row>
          <Row className="justify-content-md-center" style={style.form}>
            <Col xs lg="6">
              <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="formGroupUsername">
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    name="username"
                    value={this.state.username}
                    onChange={(event) => this.handleChange(event)}
                    autoComplete="off"
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formGroupPassword">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={(event) => this.handleChange(event)}
                    required
                  />
                  <Link to="/forgotpassword">
                    <Button variant="link">
                      <br /> Forgot Password? |{" "}
                    </Button>
                  </Link>
                </Form.Group>
                <Button variant="secondary" type="submit" size="lg" block>
                  Log In
                </Button>
              </Form>
            </Col>
          </Row>
          <Row className="justify-content-md-center" style={style.goHome}>
            <Col xs lg="2">
              <Link to="/">
                <Button variant="light" type="submit" size="lg">
                  &#60; Go Home
                </Button>
              </Link>
            </Col>
          </Row>
          <footer>
            <Row>
              <Col xs lg="12">
                <hr style={style.hr} />
              </Col>
            </Row>
            <Row>
              <Col>
                <center>
                  Don't have an account? <a href="/signup">sign up</a>
                </center>
              </Col>
            </Row>
          </footer>
        </Container>
      );
    } else {
      bodyLogin = (
        <Col className="justify-content-md-center" style={style.margin}>
          <h2>Kamu Sudah Login !!!</h2>
          <Alert key="2" variant="success">
            Silahkan kembali ke beranda{" "}
            <Alert.Link href="/">klik disini</Alert.Link>
          </Alert>
        </Col>
      );
    }

    return <div>{bodyLogin}</div>;
  }
}
export default withRouter(Login);
