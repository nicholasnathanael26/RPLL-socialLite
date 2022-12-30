import React from "react";
import { Container, Modal, Button, Form } from "react-bootstrap";
import { withRouter } from "react-router-dom";

function ModalForgotPassword(props) {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header>
        <h2>Insert New Password</h2>
      </Modal.Header>
      <Modal.Body className="show-grid" closeButton>
        <Container>
          <Form onSubmit={props.handleSubmit}>
            <Form.Group controlId="formGroupNewPassword">
              <Form.Control
                type="password"
                placeholder="New Password"
                name="newPassword"
                value={props.newPass}
                onChange={props.handleChange}
                autoComplete="off"
                required
              />
            </Form.Group>
            <Form.Group controlId="formGroupreTypePassword">
              <Form.Control
                type="password"
                placeholder="ReType Password"
                name="reTypePassword"
                value={props.reTypePass}
                onChange={props.handleChange}
                autoComplete="off"
                required
              />
            </Form.Group>
            <Button variant="secondary" type="submit" size="lg" block>
              Submit
            </Button>
            <Button variant="danger" onClick={props.onHide} size="lg" block>
              Cancel
            </Button>
          </Form>
        </Container>
      </Modal.Body>
    </Modal>
  );
}
export default withRouter(ModalForgotPassword);
