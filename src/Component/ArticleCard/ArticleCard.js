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
  Tooltip,
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
}

const ArticleCard = (props) => {
  function removeTags(str) {
    if (str === null || str === "") return false;
    else str = str.toString();
    return str.replace(/(<([^>]+)>)/gi, "");
  }

  const articleScore =
    (props.data.positiveRatings /
      (props.data.negativeRatings + props.data.positiveRatings)) *
    100;

  return (
    <div>
      <Container className={classes.ViewArticleContainer}>
        {props.auth.isEmpty ? (
          <div className={classes.Article}>
            <div className={classes.ArticleInfo}>
              <header className={classes.Title}>
                <h3>{props.data.title}</h3>
              </header>
            </div>
            <div className={classes.ImageContainer}>
              <img
                className={classes.Image}
                src={props.data.featureImage}
                alt="Feature Image"
              />
            </div>

            <div className={classes.ArticleMain}>
              {parse(removeTags(props.data.content))}
            </div>
          </div>
        ) : (
          <Link
            className={classes.Link}
            to={{
              pathname: "article/" + props.data.id,
              state: { article: props.data },
            }}
          >
            {" "}
            <div className={classes.Article}>
              <div className={classes.ArticleInfo}>
                <header className={classes.Title}>
                  <h3>{props.data.title}</h3>
                </header>
              </div>
              <div className={classes.ImageContainer}>
                <img
                  className={classes.Image}
                  src={props.data.featureImage}
                  alt="Feature Image"
                />
              </div>

              <div className={classes.ArticleMain}>
                {parse(removeTags(props.data.content))}
              </div>
            </div>
          </Link>
        )}
        <div className={classes.Info}>
          {" "}
          {!articleScore ? (
            <Badge style={{ marginRight: 4, borderRadius: 0 }} color="dark">
              Not Rated
            </Badge>
          ) : (
            <Badge style={{ marginRight: 4, borderRadius: 0 }} color="dark">
              {Math.round(articleScore)} %
            </Badge>
          )}
          {props.data.commentCount ? (
            <Badge style={{ marginRight: 4, borderRadius: 0 }} color="dark">
              R:{props.data.commentCount}
            </Badge>
          ) : (
            <Badge style={{ marginRight: 4, borderRadius: 0 }} color="dark">
              No Replies
            </Badge>
          )}
          <Badge style={{ marginRight: 4, borderRadius: 0 }} color="dark">
            P:
            {props.data.createUserID.slice(0, 7)}
          </Badge>
          <Badge style={{ marginRight: 4, borderRadius: 0 }} color="dark">
            {" "}
            D:{timeStampToString(props.data.createDate.seconds)}
          </Badge>
        </div>
      </Container>
      <hr className={classes.HorLine} />
    </div>

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
