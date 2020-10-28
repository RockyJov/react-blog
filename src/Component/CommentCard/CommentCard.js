import React, { useState, useEffect } from "react";
import {
  Card,
  CardImg,
  CardTitle,
  CardSubtitle,
  CardBody,
  Badge,
  Button,
  Col,
  Row,
  Container,
  Modal,
  ModalBody,
} from "reactstrap";
import parse from "html-react-parser";
import classes from "./CommentCard.module.css";
import { Link } from "react-router-dom";
import NewReply from "../../NewReply/NewReply";

export function timeStampToString(ts) {
  const date = new Date(ts * 1000);
  return (
    date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()
  );
}

const CommentCard = (props) => {
  const [clicked, setClicked] = useState(false);

  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);

  const [reply, setReply] = useState(props.data.content);

  timeStampToString = (ts) => {
    const date = new Date(ts * 1000);
    return (
      date.getFullYear() +
      "/" +
      (date.getMonth() + 1) +
      "/" +
      date.getDate() +
      " " +
      (date.getHours() < 10 ? "0" : "") +
      date.getHours() +
      ":" +
      (date.getMinutes() < 10 ? "0" : "") +
      date.getMinutes() +
      ":" +
      (date.getSeconds() < 10 ? "0" : "") +
      date.getSeconds()
    );
  };

  function removeTags(str) {
    if (str === null || str === "") return false;
    else str = str.toString();
    return str.replace(/(<([^>]+)>)/gi, "");
  }

  return (
    <div>
      <Container className={classes.CommentCardContainer}>
        <Row>
          <Col sm="12" md={{ size: 10, offset: 1 }}>
            <div className={classes.Comment} onClick={() => console.log("hi")}>
              {props.data.replyContent ? (
                <div className={classes.Replied}>
                  {" "}
                  "{removeTags(props.data.replyContent)}"
                </div>
              ) : null}

              {props.data.featureImage !== "" ? (
                <div className={classes.ImageContainer}>
                  {clicked ? (
                    props.data.featureExtension.includes("image") ? (
                      <img
                        className={classes.ImageEnlarged}
                        src={props.data.featureImage}
                        alt={props.data.title}
                        onClick={() => {
                          setClicked(!clicked);
                        }}
                      />
                    ) : (
                      <video
                        controls
                        className={classes.ImageEnlarged}
                        src={props.data.featureImage}
                        alt={props.data.title}
                        onClick={() => {
                          setClicked(!clicked);
                        }}
                      />
                    )
                  ) : props.data.featureExtension.includes("image") ? (
                    <img
                      className={classes.Image}
                      src={props.data.featureImage}
                      alt={props.data.title}
                      onClick={() => {
                        setClicked(!clicked);
                      }}
                    />
                  ) : (
                    <video
                      className={classes.Image}
                      src={props.data.featureImage}
                      alt={props.data.title}
                      onClick={() => {
                        setClicked(!clicked);
                      }}
                    />
                  )}
                </div>
              ) : null}

              <div className={classes.CommentMain}>
                {parse(props.data.content)}
              </div>
            </div>
            <div className={classes.Info}>
              {" "}
              <Badge style={{ marginRight: 4 }}>
                {props.data.createUserID.slice(0, 7)}
              </Badge>
              <Badge
                style={{ marginRight: 4 }}
                data-toggle="tooltip"
                data-placement="bottom"
                title={props.data.createDate.seconds}
              >
                {" "}
                {timeStampToString(props.data.createDate.seconds)}
              </Badge>
              <Button
                onClick={() => {
                  setIsReplyModalOpen(!isReplyModalOpen);
                }}
                style={{ float: "right" }}
              >
                Reply
              </Button>
            </div>
            <Modal
              centered
              toggle={() => setIsReplyModalOpen(!isReplyModalOpen)}
              isOpen={isReplyModalOpen}
            >
              <ModalBody>
                <NewReply
                  reply={reply}
                  onReplyToggle={() => setIsReplyModalOpen(!isReplyModalOpen)}
                />
              </ModalBody>
            </Modal>
          </Col>
        </Row>
      </Container>
      <hr className={classes.HorLine} />
    </div>
  );
};

export default CommentCard;
