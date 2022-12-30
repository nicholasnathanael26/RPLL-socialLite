import React, { Component } from "react";
import {
  InputGroup,
  FormControl,
  Button,
  Navbar,
  Form,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import Logo from "../asset/logo.png";
import Search from "../asset/search-24px.svg";
import Upload from "../asset/upload.svg";
import DM from "../asset/directMessage.svg";
import Profile from "../asset/account.svg";

class navbarComponent extends Component {
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
        profileImage: "",
      },
      search: "",
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
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = () => {
    this.props.history.push(`/profile/${this.state.search}`);
  };

  render() {
    const style = {
      logo: {
        marginTop: "20px",
        width: "120px",
        height: "100px",
      },
      search: {
        marginTop: "40px",
        marginLeft: "-220px",
      },
      formSearch: {
        borderRadius: "30px",
        width: "270px",
      },
      buttonLogin: {
        width: "140px",
        marginRight: "20px",
      },
      buttonSignup: {
        width: "140px",
        marginRight: "50px",
      },
      buttonSearch: {
        width: "30px",
        height: "30px",
      },
      groupFromSearch: {
        marginLeft: "100px",
      },
      navbar: {
        height: "7em",
      },
      brand: {
        marginLeft: "60px",
      },
      upload: {
        width: "40px",
        height: "40px",
        marginRight: "20px",
      },
      DM: {
        width: "40px",
        height: "40px",
        marginRight: "20px",
      },
      profile: {
        borderRadius: "70px",
        width: "40px",
        height: "40px",
        marginRight: "40px",
      },
    };

    const renderTooltip = (props) => (
      <Tooltip id="button-tooltip" {...props}>
        {this.state.data.fullname}
      </Tooltip>
    );

    let buttons;
    let imageProfile;

    if (this.state.data.profileImage !== `data:image/jpeg;base64,null`) {
      imageProfile = (
        <img
          src={this.state.data.profileImage}
          style={style.profile}
          alt="direct profile"
        />
      );
    } else {
      imageProfile = (
        <img src={Profile} style={style.profile} alt="direct default" />
      );
    }

    if (this.state.data.username !== null) {
      buttons = (
        <InputGroup className="justify-content-md-end">
          <Link to="/upload">
            <img src={Upload} style={style.upload} alt="upload" />
          </Link>
          <Link to="/directmessage">
            <img src={DM} style={style.DM} alt="direct message" />
          </Link>
          <Link to="/profile">
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip}
            >
              {imageProfile}
            </OverlayTrigger>
          </Link>
        </InputGroup>
      );
    } else {
      buttons = (
        <InputGroup className="justify-content-md-end">
          <Link to="/login">
            <Button
              variant="secondary"
              type="submit"
              size=""
              style={style.buttonLogin}
            >
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button
              variant="dark"
              type="submit"
              size=""
              style={style.buttonSignup}
            >
              Sign Up
            </Button>
          </Link>
        </InputGroup>
      );
    }
    return (
      <Navbar bg="light" expand="lg" style={style.navbar} fixed="top">
        <Navbar.Brand href="/" style={style.brand}>
          <img
            src={Logo}
            style={style.logo}
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <InputGroup
            className="justify-content-md-center"
            style={style.groupFromSearch}
            xs
            lg="6"
          >
            <Form onSubmit={this.handleSubmit} inline>
              <FormControl
                type="text"
                placeholder="Search"
                name="search"
                style={style.formSearch}
                autoComplete="off"
                onChange={(event) => this.handleChange(event)}
              />
              <InputGroup.Prepend>
                <Button variant="black" type="submit">
                  <img
                    src={Search}
                    alt="search"
                    style={style.buttonSearch}
                  ></img>
                </Button>
              </InputGroup.Prepend>
            </Form>
          </InputGroup>
          {buttons}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
export default withRouter(navbarComponent);
