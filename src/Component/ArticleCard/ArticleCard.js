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

const ArticleCard = (props) => {
  return (
    <Card className={classes.ArticleCard}>
      <CardImg
        top
        width="100%"
        src="http://placeimg.com/354/100/any"
        alt="Card Image"
        className={classes.CardImage}
      />
      <CardBody className={classes.CardBody}>
        <CardTitle className={classes.CardTitle}>Title</CardTitle>
        <CardSubtitle className={classes.CardSubtitle}>
          <Badge className={classes.ArticleLabel}>Topic</Badge>
        </CardSubtitle>
      </CardBody>
    </Card>
  );
};

export default ArticleCard;
