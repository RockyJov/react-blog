import React, { Component } from "react";
import classes from "./ViewArticle.module.css";
import { withRouter } from "react-router-dom";
import parse from "html-react-parser";
import { Container } from "reactstrap";
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
        <Container>
          <div className={classes.Article}>
            <div className={classes.ImageConainer}>
              <img
                className={classes.Image}
                src={this.state.article.featureImage}
                alt={this.state.article.title}
              />
            </div>
            <div className={classes.ArticleInfo}>
              <h1 className={classes.Title}>{this.state.article.title}</h1>
              <div className={classes.Date}>
                {" "}
                {this.timeStampToString(
                  this.state.article.lastModified.seconds
                )}
              </div>
              <h2>Posted by: {this.state.article.createUserID.slice(0, 10)}</h2>
              <h2>{this.props.match.params.id}</h2>
            </div>
            <div className={classes.ArticleMain}>
              {parse(this.state.article.content)}
            </div>
            <button>+</button>
            <button>-</button>
          </div>
        </Container>
      );
    } else {
      return <div>loading...</div>;
    }
  }
}

export default withRouter(ViewArticle);
