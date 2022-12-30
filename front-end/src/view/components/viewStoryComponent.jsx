import React from "react";
import { Container, Modal, Row, Col } from "react-bootstrap";
import { withRouter } from "react-router-dom";

function ViewStoryComponent(props) {
  const style = {
    photo: {
      width: "500px",
      height: "500px",
    },
    btn_close: {
      borderRadius: "20px",
    },
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="show-grid" closeButton>
        <Container>
          <center>
            <Row>
              <Col>
                <img
                  src={`data:image/jpeg;base64,${props.image}`}
                  alt="post"
                  style={style.photo}
                ></img>
              </Col>
            </Row>
          </center>
        </Container>
      </Modal.Body>
    </Modal>
  );
}
export default withRouter(ViewStoryComponent);
