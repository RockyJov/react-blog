import React, { Component } from "react";
import firebase from "../../Config/firebase";

const db = firebase.firestore();

class ArticleScore extends Component() {
  constructor(props) {
    super(props);
    this.state = {
      articleScore: null,
    };
  }

  render() {
    return <div>{props.data.positiveRating}</div>;
  }
}

export default ArticleScore;
