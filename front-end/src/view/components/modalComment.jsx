import React from "react";
import {
  Container,
  Modal,
  Row,
  Col,
  Button,
  Toast,
  Form,
} from "react-bootstrap";
import { withRouter } from "react-router-dom";
import Sticky from "react-sticky-el";
import Close from "../asset/close.svg";
import Send from "../asset/send.svg";
import Profile from "../asset/account.svg";
import Edit from "../asset/edit.svg";
import Bookmark from "../asset/bookmark.svg";

function ModalComment(props) {
  const style = {
    photo: {
      width: "290px",
      height: "300px",
    },
    icon: {
      width: "50px",
      heigth: "50px",
      borderRadius: "20px",
    },
    sticky: {
      height: "210px",
      width: "440px",
      overflow: "scroll",
      position: "fixed",
    },
    marginToast: {
      marginLeft: "30px",
      marginBottom: "10px",
    },
    form: {
      borderRadius: "30px",
      marginRight: "40px",
    },
    btn_send: {
      width: "45px",
      height: "45px",
      borderRadius: "20px",
      marginLeft: "10px",
    },
    btn_close: {
      borderRadius: "20px",
    },
    rowComment: {
      marginTop: "10px",
      marginRight: "10px",
      marginLeft: "-80px",
    },
    icon_comment: {
      width: "45px",
      height: "45px",
      borderRadius: "20px",
    },
    marginToastCaption: {
      marginLeft: "15px",
      borderRadius: "20px"
    },
    caption: {
      marginLeft: "10px"
    },
    username: {
      fontSize: "18px"
    }
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
          <Row>
            <Col xs={6} md={5}>
              <img
                src={`data:image/jpeg;base64,${props.image}`}
                alt="post"
                style={style.photo}
              ></img>
            </Col>
            <Col>
              <b style={style.username}>{props.username}</b>
              <p style={style.caption}><i>{props.caption}</i></p>
              <div className="scrollarea" style={style.sticky}>
                <Sticky>
                  {props.comment.map((data) => (
                    <Row xs={6} md={4}>
                      <Toast style={style.marginToast}>
                        <Toast.Header closeButton={false}>
                          <strong className="mr-auto">{data.username}</strong>
                        </Toast.Header>
                        <Toast.Body>{data.comment}</Toast.Body>
                      </Toast>
                    </Row>
                  ))}
                </Sticky>
              </div>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        {props.page === "profile" ? (
          <Button variant="light" onClick={props.showEdit}>
            <img src={Edit} alt="edit"></img>
          </Button>
        ) : (
          ""
        )}
        {props.page === "bookmark" ? (
          <Button variant="light" onClick={props.removeBookmark}>
            <img src={Bookmark} alt="bookmark"></img>
          </Button>
        ) : (
          ""
        )}
        <img
          src={
            props.profile !== "data:image/jpeg;base64,null"
              ? props.profile
              : Profile
          }
          alt="iconComment"
          style={style.icon_comment}
        ></img>
        <Form onSubmit={props.handleSubmit}>
          <Row style={style.rowComment}>
            <Col sm={2}>
              <Form.Control type="hidden" name="idPost" value={props.post} />
            </Col>
            <Col sm={8}>
              <Form.Control
                type="text"
                placeholder="Enter Comment"
                name="comment"
                style={style.form}
                value={props.value}
                onChange={props.handleChange}
                autoComplete="off"
              />
            </Col>
            <Col sm={2}>
              <Button variant="primary" type="submit" style={style.btn_send}>
                <img src={Send} alt="send"></img>
              </Button>
            </Col>
          </Row>
        </Form>
        <Button variant="danger" onClick={props.onHide}>
          <img src={Close} alt="close" style={style.btn_close}></img>
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default withRouter(ModalComment);
