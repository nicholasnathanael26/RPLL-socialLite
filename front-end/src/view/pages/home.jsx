import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { URL_API } from "../utils/constant.js";
import NavbarComponent from "../components/navbarComponent";
import StoryComponent from "../components/storyComponent";
import PostComponent from "../components/postComponent";
import SuggestComponent from "../components/suggestComponent";
import PostGuestComponent from "../components/postGuestComponent";
import axios from "axios";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        id: "",
      },
    };
  }

  componentDidMount = () => {
    setInterval(this.removeStory, 5000);
    this.setState({
      id: localStorage.getItem("id"),
    });
  };

  removeStory() {
    axios
      .delete(`${URL_API}api/RemoveStory`)
      .then((res) => {})
      .catch((error) => {
        console.log("error remove");
      });
  }

  render() {
    const style = {
      margin: {
        marginTop: "150px",
      },
      margin_Post: {
        marginRight: "50px",
      },
      margin_story: {
        marginRight: "50px",
      },
    };

    let body;

    if (this.state.id !== null) {
      body = (
        <Container>
          <NavbarComponent />
          <Row style={style.margin}>
            <Col sm style={style.margin_story}>
              <StoryComponent />
            </Col>
            <Col sm style={style.margin_Post}>
              <PostComponent />
            </Col>
            <Col sm>
              <SuggestComponent />
            </Col>
          </Row>
        </Container>
      );
    } else {
      body = (
        <Container>
          <NavbarComponent />
          <Row style={style.margin}>
            <Col sm style={style.margin_story}>
              <StoryComponent />
            </Col>
            <Col sm style={style.margin_Post}>
              <PostGuestComponent />
            </Col>
            <Col sm>
              <SuggestComponent />
            </Col>
          </Row>
        </Container>
      );
    }

    return <div>{body}</div>;
  }
}
export default Home;
