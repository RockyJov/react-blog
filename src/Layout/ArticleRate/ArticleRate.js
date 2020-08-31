import React, { Component } from "react";
import firebase from "../../Config/firebase";
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

  test = () => {
    const articleRate = this.state.articleRate;
    articleRate.createUserID = this.props.auth.uid;
    console.log(articleRate.createUserID);
  };

  submitRating = () => {
    const aid = this.props.location.pathname.slice(9);
    const comment = this.state.comment;
    comment.createUserID = this.props.auth.uid;
    db.collection("Articles")
      .doc(aid)
      .collection("Ratings")
      .add(comment)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <Container>
        <Button>+</Button>
        <Button onClick={() => this.test()}>-</Button>
      </Container>
    );
  }
}

export default ArticleRate;
