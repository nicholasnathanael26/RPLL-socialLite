import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import NavbarComponent from "../components/navbarComponent";
import StoryComponent from "../components/storyComponent";
import ProfileComponent from "../components/profileComponent";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        id: "",
      },
    };
  }

  componentDidMount = () => {
    this.setState({
      data: {
        id: localStorage.getItem("id"),
      },
    });
  };
  render() {
    const style = {
      margin: {
        marginTop: "150px",
      },
    };

    let body;

    if (this.state.data.id !== null) {
      body = (
        <Container>
          <NavbarComponent />
          <Row style={style.margin}>
            <Col sm="3">
              <StoryComponent />
            </Col>
            <Col sm="8">
              <ProfileComponent />
            </Col>
          </Row>
        </Container>
      );
    } else {
      body = (
        <div>
          <ProfileComponent />
        </div>
      );
    }

    return <div>{body}</div>;
  }
}
export default Profile;
