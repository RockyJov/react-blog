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
import { connect } from "react-redux";
import classes from "./ArticleCard.module.css";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
import firebase from "../../Config/firebase";

// data yyyy/mm/dd formatu

export function timeStampToString(ts) {
  const date = new Date(ts * 1000);
  return (
    date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()
  );
}

const ArticleCard = (props) => {
  const articleScore =
    (props.data.positiveRatings /
      (props.data.negativeRatings + props.data.positiveRatings)) *
    100;
  return (
    <Card className={classes.ArticleCard}>
      {" "}
      <Container>
        <Row>
          <Col xs="2">
            {" "}
            <Link
              className={classes.CardLink}
              to={{
                pathname: "article/" + props.data.id,
                state: { article: props.data },
              }}
            >
              {" "}
              <CardImg
                top
                width="100%"
                src={props.data.featureImage}
                alt="Card Image"
                className={classes.CardImage}
              />
            </Link>
          </Col>
          <Col>
            {" "}
            <CardBody className={classes.CardBody}>
              <CardTitle className={classes.CardTitle}>
                <Link
                  to={{
                    pathname: "article/" + props.data.id,
                    state: { article: props.data },
                  }}
                >
                  {props.data.title}
                </Link>
              </CardTitle>
              <CardSubtitle className={classes.CardSubtitle}>
                {props.data.content}
                <Badge className={classes.ArticleLabel}>
                  {props.data.categoryLabel}
                </Badge>
                <Badge className={classes.createDate}>
                  {timeStampToString(props.data.createDate.seconds)}
                </Badge>
                <div>
                  <Badge>
                    Created by: {props.data.createUserID.slice(0, 10)}
                  </Badge>
                </div>
                <div>
                  <Badge>Ratings Score : {Math.round(articleScore)}%</Badge>
                </div>
                <div>
                  <Badge>Comments: {props.data.commentCount}</Badge>
                </div>
              </CardSubtitle>
            </CardBody>
          </Col>
        </Row>
      </Container>
    </Card>
  );
};
const enhance = connect(({ firebase: { auth, profile } }) => ({
  auth,
  profile,
}));

export default enhance(ArticleCard);
