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

  clickPositive = () => {
    this.setState({
      articleRate: {
        ...this.state.articleRate,
        positiveRating: true,
        negativeRating: false,
      },
    });
  };

  clickNegative = () => {
    this.setState({
      articleRate: {
        ...this.state.articleRate,
        positiveRating: false,
        negativeRating: true,
      },
    });
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
        <Button>-</Button>
      </Container>
    );
  }
}

export default ArticleRate;
