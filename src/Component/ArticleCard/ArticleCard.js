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
    <Container className={classes.ViewArticleContainer}>
      <div className={classes.Article}>
        <div className={classes.ArticleInfo}>
          <header className={classes.Title}>{props.data.title}</header>
        </div>
        {props.auth.isEmpty ? (
          <div className={classes.ImageContainer}>
            <img
              className={classes.Image}
              src={props.data.featureImage}
              alt="Feature Image"
            />
          </div>
        ) : (
          <Link
            className={classes.ImageLink}
            to={{
              pathname: "article/" + props.data.id,
              state: { article: props.data },
            }}
          >
            <div className={classes.ImageContainer}>
              {" "}
              <img
                src={props.data.featureImage}
                alt="Card Image"
                className={classes.Image}
              />
            </div>
          </Link>
        )}

        <div className={classes.ArticleMain}>{parse(props.data.content)}</div>
      </div>
      <div className={classes.Info}>
        {" "}
        <Badge style={{ marginRight: 4 }}> {Math.round(articleScore)}%</Badge>
        <Badge style={{ marginRight: 4 }}>{props.data.commentCount}</Badge>
        <Badge style={{ marginRight: 4 }}>
          {props.data.createUserID.slice(0, 7)}
        </Badge>
        <Badge style={{ marginRight: 4 }}>
          {" "}
          {timeStampToString(props.data.createDate.seconds)}
        </Badge>
      </div>
    </Container>

    // <Container className={classes.ArticleCardContainer}>
    //   <Row>
    //     <Col xs="2 px-0 ">
    //       {" "}
    //       {props.auth.isEmpty ? (
    //         <div className={classes.ImageContainer}>
    //           {" "}
    //           <img
    //             src={props.data.featureImage}
    //             alt="Card Image"
    //             className={classes.Image}
    //           />
    //         </div>
    //       ) : (
    //         <Link
    //           className={classes.ImageLink}
    //           to={{
    //             pathname: "article/" + props.data.id,
    //             state: { article: props.data },
    //           }}
    //         >
    //           <div className={classes.ImageContainer}>
    //             {" "}
    //             <img
    //               src={props.data.featureImage}
    //               alt="Card Image"
    //               className={classes.Image}
    //             />
    //           </div>
    //         </Link>
    //       )}
    //     </Col>
    //     <Col xs="10 px-0">
    //       {" "}
    //       <CardBody className={classes.CardBody}>
    //         <CardTitle className={classes.CardTitle}>
    //           <b> {props.data.title}</b>
    //         </CardTitle>
    //         <CardSubtitle className={classes.CardSubtitle}>
    //           {parse(props.data.content.slice(0, 145), { trim: true })}
    //         </CardSubtitle>
    //         <CardSubtitle classesName={classes.Badges}>
    //           <Badge className={classes.CardBadge}>
    //             {Math.round(articleScore)}%
    //           </Badge>
    //           <Badge className={classes.CardBadge}>
    //             {props.data.commentCount}
    //           </Badge>
    //           <Badge className={classes.CardBadge}>
    //             {props.data.createUserID.slice(0, 10)}
    //           </Badge>

    //           <Badge className={classes.CardBadge}>
    //             {timeStampToString(props.data.createDate.seconds)}
    //           </Badge>
    //         </CardSubtitle>
    //       </CardBody>
    //     </Col>
    //   </Row>
    // </Container>
  );
};
const enhance = connect(({ firebase: { auth, profile } }) => ({
  auth,
  profile,
}));

export default enhance(ArticleCard);
