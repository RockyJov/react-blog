import React, { Component } from "react";
import firebase from "../../Config/firebase";
import classes from "./ArticleRate.module.css";
import { Button, Container } from "reactstrap";
import { isEmpty } from "react-redux-firebase";

const db = firebase.firestore();

class ArticleRate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articleRate: {
        createUserID: "",
        createDate: new Date(),
        positiveRating: "",
        negativeRating: "",
        visible: true,
      },
    };
  }

  submitNegativeRating = () => {
    const aid = this.props.location.pathname.slice(9);
    const articleRate = this.state.articleRate;
    articleRate.createUserID = this.props.auth.uid;
    articleRate.negativeRating = true;
    articleRate.positiveRating = false;
    db.collection("Articles")
      .doc(aid)
      .collection("Ratings")
      .add(articleRate)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  submitPositiveRating = () => {
    const aid = this.props.location.pathname.slice(9);
    const articleRate = this.state.articleRate;
    articleRate.createUserID = this.props.auth.uid;
    articleRate.positiveRating = true;
    articleRate.negativeRating = false;
    db.collection("Articles")
      .doc(aid)
      .collection("Ratings")
      .add(articleRate)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <Container>
        <div className={classes.Rate}>
          <h1>Rate this article</h1>
          {this.state.articleRate.visible ? (
            <div className={classes.Button}>
              {" "}
              <Button onClick={(e) => this.submitPositiveRating()}>+</Button>
              <Button onClick={(e) => this.submitNegativeRating()}>-</Button>
            </div>
          ) : null}
          <Button onClick={() => console.log(this.state.articleRate)}>
            Console
          </Button>
          <Button
            onClick={() => {
              this.setState({
                articleRate: {
                  ...this.state.articleRate,
                  visible: false,
                },
              });
            }}
          >
            Hide
          </Button>
          <Button
            onClick={() => {
              this.setState({
                articleRate: {
                  ...this.state.articleRate,
                  visible: true,
                },
              });
            }}
          >
            Show
          </Button>
        </div>
      </Container>
    );
  }
}

export default ArticleRate;
