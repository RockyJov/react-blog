import React from "react";
import {
  Card,
  CardImg,
  CardTitle,
  CardSubtitle,
  CardBody,
  Badge,
  Col,
  Row,
  Container,
} from "reactstrap";
import classes from "./CommentCard.module.css";
import { Link } from "react-router-dom";

// data yyyy/mm/dd formatu

export function timeStampToString(ts) {
  const date = new Date(ts * 1000);
  return (
    date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()
  );
}

const CommentCard = (props) => {
  return (
    <Card className={classes.ArticleCard}>
      {" "}
      <Container>
        <Row>
          <Col xs="2">
            {" "}
            <CardImg
              top
              width="100%"
              src={props.data.featureImage}
              alt="Card Image"
              className={classes.CardImage}
            />
          </Col>
          <Col>
            {" "}
            <CardBody className={classes.CardBody}>
              <CardTitle className={classes.CardTitle}></CardTitle>
              <CardSubtitle className={classes.CardSubtitle}>
                {props.data.content}
                <Badge className={classes.ArticleLabel}>
                  {props.data.categoryLabel}
                </Badge>
                <Badge className={classes.createDate}>
                  {timeStampToString(props.data.createDate.seconds)}
                </Badge>
                <div></div>
                <Badge>
                  Created by: {props.data.createUserID.slice(0, 10)}
                </Badge>
              </CardSubtitle>
            </CardBody>
          </Col>
        </Row>
      </Container>
    </Card>
  );
};

export default CommentCard;
