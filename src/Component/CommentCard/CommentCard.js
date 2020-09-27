import React from "react";
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
} from "reactstrap";
import parse from "html-react-parser";
import classes from "./CommentCard.module.css";
import { Link } from "react-router-dom";

export function timeStampToString(ts) {
  const date = new Date(ts * 1000);
  return (
    date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()
  );
}

const CommentCard = (props) => {
  timeStampToString = (ts) => {
    const date = new Date(ts * 1000);
    return (
      date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()
    );
  };
  return (
    <div>
      <Container className={classes.CommentCardContainer}>
        <div className={classes.Comment}>
          {props.data.featureImage !== "" ? (
            <div className={classes.ImageContainer}>
              <img
                className={classes.Image}
                src={props.data.featureImage}
                alt={props.data.title}
              />
            </div>
          ) : null}

          <div className={classes.CommentMain}>{parse(props.data.content)}</div>
        </div>
        <div className={classes.Info}>
          {" "}
          <Badge style={{ marginRight: 4 }}>
            {props.data.createUserID.slice(0, 7)}
          </Badge>
          <Badge style={{ marginRight: 4 }}>
            {" "}
            {timeStampToString(props.data.createDate.seconds)}
          </Badge>
        </div>
      </Container>
      <hr className={classes.HorLine} />
    </div>
  );
};

export default CommentCard;
