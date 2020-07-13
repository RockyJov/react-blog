import React, { Component } from "react";
import classes from "./ViewArticle.module.css";
import { withRouter } from "react-router-dom";
import parse from "html-react-parser";
import { Container } from "reactstrap";

class ViewArticle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      article: {},
      isLoaded: false,
    };

    console.log(this.props);
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
    }
  }

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
            <div className={classes.ImageContaier}>
              <img
                className={classes.Image}
                src={this.state.article.featureImage}
                alt={this.state.article.title}
              />
            </div>
            <div className={classes.ArticleInfo}>
              <h1 className={classes.Title}>{this.state.article.title}</h1>
              <div className={classes.Date}>
                {this.timeStampToString(
                  this.state.article.lastModified.seconds
                )}
              </div>
            </div>
            <div className={classes.ArticleMain}>
              {parse(this.state.article.content)}
            </div>
          </div>
        </Container>
      );
    } else {
      return <div>loading...</div>;
    }
  }
}

export default withRouter(ViewArticle);
