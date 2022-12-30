import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import NavbarComponent from "../components/navbarComponent";
import SearchAccountComponent from "../components/searchAccountComponent";
import StoryComponent from "../components/storyComponent";

function searchaccount(props) {
  const style = {
    margin: {
      marginTop: "150px",
    },
  };
  return (
    <Container>
      <NavbarComponent />
      <Row style={style.margin}>
        <Col sm="3">
          <StoryComponent />
        </Col>
        <Col sm="8">
          <SearchAccountComponent />
        </Col>
      </Row>
    </Container>
  );
}
export default searchaccount;
