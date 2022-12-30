import React, { useState, useEffect } from "react";
import { Container, Row, Toast, Button, Form } from "react-bootstrap";
import { withRouter, useHistory } from "react-router-dom";
import { URL_API } from "../utils/constant";
import Profile from "../asset/account.svg";
import Sticky from "react-sticky-el";
import axios from "axios";
import Send from "../asset/send.svg";

function ChatComponent(props) {
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [dataChat, setData] = useState([]);
  const [chat, setChat] = useState("");

  let history = useHistory();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          URL_API +
          `api/findAllDirectMessage/${localStorage.getItem("id")}/${props.id}`
        );
        setData(response.data);
        setName(props.fullname);
        setId(localStorage.getItem("id"));

      } catch (error) { }
    }
    fetchData();
  }, [props.id, props.fullname]);

  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get(
          URL_API +
          `api/findAllDirectMessage/${localStorage.getItem("id")}/${props.id}`
        )
        .then((res) => {
          setData(res.data);
          console.log(props.id);
        });
    }, 2000);
    return () => clearInterval(interval);
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const id = localStorage.getItem("id");
    const data = {
      from: id,
      to: props.id,
      message: chat,
    };

    axios.post(URL_API + `api/directMessage`, data).then((res) => {
      axios
        .get(
          URL_API +
          `api/findAllDirectMessage/${localStorage.getItem("id")}/${props.id}`
        )
        .then((res) => {
          setData(res.data);
          setChat("");
        });
    });
  };

  const search = (username) => {
    history.push(`/profile/${username}`);
  }

  const style = {
    margin: {
      marginTop: "20px",
    },
    photoProfile: {
      width: "50px",
      heigth: "50px",
      borderRadius: "20px",
    },
    textNama: {
      marginLeft: "20px",
      marginTop: "5px",
      textDecoration: "none",
      color: "black"
    },
    sticky: {
      height: "400px",
      width: "950px",
      overflow: "scroll",
      position: "fixed",
    },
    marginToast: {
      marginLeft: "20px",
      marginBottom: "10px",
      borderRadius: "20px",
    },
    photoChat: {
      marginLeft: "20px",
      borderRadius: "70px",
      width: "40px",
      height: "40px",
    },
    btn_send: {
      width: "45px",
      height: "45px",
      borderRadius: "20px",
      marginLeft: "10px",
    },
    inputChat: {
      borderRadius: "20px",
    },
    rowChat: {
      marginTop: "410px",
    },
    toRight: {
      marginLeft: "500px",
    },
  };

  let body;

  if (props.id !== "") {
    body = (
      <Container>
        <Row>
          <Button variant="link" style={style.textNama} onClick={() => search(props.username)}>
            <h3>{name}</h3>
          </Button>
        </Row>
        <Row style={style.margin}>
          <div className="scrollarea" style={style.sticky}>
            <Sticky>
              {dataChat.map((data) =>
                // eslint-disable-next-line
                data.from.id == id ? (
                  <div>
                    <Row style={style.toRight}>
                      <Toast style={style.marginToast}>
                        <Toast.Header closeButton={false}>
                          <strong className="mr-auto">
                            {data.from.fullname}
                          </strong>
                        </Toast.Header>
                        <Toast.Body>{data.message}</Toast.Body>
                      </Toast>
                      <img
                        src={
                          data.from.profileImage !== null
                            ? `data:image/jpeg;base64,${data.from.profileImage}`
                            : Profile
                        }
                        alt="profilePicture"
                        style={style.photoChat}
                      ></img>
                    </Row>
                  </div>
                ) : (
                  <div>
                    <Row>
                      <img
                        src={
                          data.from.profileImage !== null
                            ? `data:image/jpeg;base64,${data.from.profileImage}`
                            : Profile
                        }
                        alt="profilePicture"
                        style={style.photoChat}
                      ></img>
                      <Toast style={style.marginToast}>
                        <Toast.Header closeButton={false}>
                          <strong className="mr-auto">
                            {data.from.fullname}
                          </strong>
                        </Toast.Header>
                        <Toast.Body>{data.message}</Toast.Body>
                      </Toast>
                    </Row>
                  </div>
                )
              )}
            </Sticky>
          </div>
        </Row>
        <Row style={style.rowChat}>
          <Form inline onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control
                type="text"
                className="mx-sm-3"
                name="chat"
                placeholder="Insert New Chat"
                style={style.inputChat}
                value={chat}
                autoComplete="off"
                onChange={(e) => setChat(e.target.value)}
              />
              <Button style={style.btn_send} variant="primary" type="submit">
                <img src={Send} alt="send"></img>
              </Button>
            </Form.Group>
          </Form>
        </Row>
      </Container>
    );
  }
  return <div>{body}</div>;
}
export default withRouter(ChatComponent);
