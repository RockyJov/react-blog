import React, { Component } from "react";
import classes from "./ViewArticle.module.css";
import { withRouter } from "react-router-dom";
import parse from "html-react-parser";
import { Container, Badge } from "reactstrap";
import firebase from "../../../src/Config/firebase";

const db = firebase.firestore();

class ViewArticle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      article: {},
      isLoaded: false,
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
      date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()
    );
  };

  render() {
    if (this.state.isLoaded) {
      return (
        <Container className={classes.ViewArticleContainer}>
          <div className={classes.Article}>
            <div className={classes.ArticleInfo}>
              <header className={classes.Title}>
                {this.state.article.title}
              </header>
            </div>
            <div className={classes.ImageContainer}>
              <img
                className={classes.Image}
                src={this.state.article.featureImage}
                alt={this.state.article.title}
              />
            </div>
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
              {this.timeStampToString(this.state.article.createDate.seconds)}
            </Badge>
            <Badge>{this.state.article.commentCount}</Badge>
          </div>
        </Container>
      );
    } else {
      return <div>loading...</div>;
    }
  }
}

export default withRouter(ViewArticle);
