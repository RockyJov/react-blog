import React from "react";
import {
  Card,
  CardImg,
  CardTitle,
  CardSubtitle,
  CardBody,
  Badge,
} from "reactstrap";
import classes from "./ArticleCard.module.css";

export function timeStampToString(ts) {
  const date = new Date(ts * 1000);
  return (
    date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()
  );
}

const ArticleCard = (props) => {
  return (
    <Card className={classes.ArticleCard}>
      <CardImg
        top
        width="100%"
        src="http://placeimg.com/354/300/any"
        alt="Card Image"
        className={classes.CardImage}
      />
      <CardBody className={classes.CardBody}>
        <CardTitle className={classes.CardTitle}>{props.data.title}</CardTitle>
        <CardSubtitle className={classes.CardSubtitle}>
          <Badge className={classes.ArticleLabel}>
            {props.data.categoryLabel}
          </Badge>
          <Badge className={classes.createDate}>
            {timeStampToString(props.data.createDate.seconds)}
          </Badge>
        </CardSubtitle>
      </CardBody>
    </Card>
  );
};

export default ArticleCard;
