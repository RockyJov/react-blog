import React, { Component } from "react";
import classes from "./ViewArticle.module.css";
import { withRouter } from "react-router-dom";
import parse from "html-react-parser";
import { Container, Badge, Button, Row, Col } from "reactstrap";
import firebase from "../../../src/Config/firebase";
import NewComment from "../../NewComment/NewComment";

const db = firebase.firestore();

class ViewArticle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      article: {},
      isLoaded: false,
      isEnlarged: false,
    };
  }

  componentDidMount() {
    if (typeof this.props.location.state !== "undefined") {
      if (this.props.location.state.hasOwnProperty("article")) {
        this.setState(
          {
            article: this.props.location.state.article,
          },
          () => {
            this.setState({ isLoaded: true });
          }
        );
      }
    } else {
      this.getArticleByID(this.props.match.params.id);
    }
  }

  modalRef = ({ toggleModal }) => {
    this.showModal = toggleModal;
  };

  onCommentClick = () => {
    this.showModal();
  };

  // ka sita funkcija daro??
  getArticleByID = (aid) => {
    db.collection("Articles")
      .doc(aid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          this.setState(
            {
              article: doc.data(),
            },
            () => {
              this.setState({
                isLoaded: true,
              });
            }
          );
        } else {
          this.props.history.push({ pathname: "/" });
        }
      });
  };

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

  handleIsEnlarged = () => {
    this.setState({ isEnlarged: !this.state.isEnlarged });
  };

  render() {
    if (this.state.isLoaded) {
      return (
        <Container className={classes.ViewArticleContainer}>
          <Row>
            <Col sm="12" md={{ size: 10, offset: 1 }}>
              {" "}
              <div className={classes.Article}>
                <div className={classes.ArticleInfo}>
                  <header className={classes.Title}>
                    {this.state.article.title}
                  </header>
                </div>
                {this.state.article.featureExtension.includes("image") && (
                  <div className={classes.ImageContainer}>
                    {this.state.isEnlarged ? (
                      <img
                        className={classes.ImageEnlarged}
                        src={this.state.article.featureImage}
                        onClick={this.handleIsEnlarged}
                        alt={this.state.article.title}
                      />
                    ) : (
                      <img
                        className={classes.Image}
                        src={this.state.article.featureImage}
                        alt={this.state.article.title}
                        onClick={this.handleIsEnlarged}
                      />
                    )}
                  </div>
                )}
                {this.state.article.featureExtension.includes("video") && (
                  <div className={classes.ImageContainer}>
                    <video
                      controls
                      className={classes.ImageEnlarged}
                      src={this.state.article.featureImage}
                      onClick={this.handleIsEnlarged}
                      alt={this.state.article.title}
                    />
                  </div>
                )}

                <div className={classes.ArticleMain}>
                  {parse(this.state.article.content)}
                </div>
              </div>
              <div className={classes.Info}>
                {" "}
                <Badge style={{ marginRight: 4 }}>
                  {this.state.article.createUserID.slice(0, 7)}
                </Badge>
                <Badge style={{ marginRight: 4 }}>
                  {" "}
                  {this.timeStampToString(
                    this.state.article.createDate.seconds
                  )}
                </Badge>
                <Badge>{this.state.article.commentCount}</Badge>
              </div>
            </Col>
          </Row>
        </Container>
      );
    } else {
      return <div>loading...</div>;
    }
  }
}

export default withRouter(ViewArticle);
