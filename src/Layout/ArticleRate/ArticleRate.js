import React, { Component } from "react";
import firebase from "../../Config/firebase";
import classes from "./ArticleRate.module.css";
import { Button, Container } from "reactstrap";

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
          <div className={classes.Button}>
            {" "}
            <Button onClick={(e) => this.submitPositiveRating()}>+</Button>
            <Button onClick={(e) => this.submitNegativeRating()}>-</Button>
            <Button onClick={() => console.log(this.state.articleRate)}>
              "Fuck"
            </Button>
          </div>
        </div>
      </Container>
    );
  }
}

export default ArticleRate;
