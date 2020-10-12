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
      hasRatedPositive: false,
      hasRatedNegative: false,
    };
  }

  componentDidMount() {
    const userRef = db.collection("Users").doc(this.props.auth.uid);
    userRef.get().then((doc) => {
      //check if user has voted
      if (
        doc
          .data()
          .positiveRatings.includes(this.props.location.pathname.slice(9))
      ) {
        this.setState({ hasRatedPositive: true });
        console.log(
          "User has already rated. hasRatedPositive is set to: " +
            this.state.hasRatedPositive
        );
      } else {
        console.log("user had not yt rated positive");
      }
      if (
        doc
          .data()
          .negativeRatings.includes(this.props.location.pathname.slice(9))
      ) {
        this.setState({ hasRatedNegative: true });
        console.log(
          "User has already rated. hasRatedNegative is set to: " +
            this.state.hasRatedNegative
        );
      } else {
        console.log("user has not yet rated negative");
      }
    });
  }

  positiveRating = () => {
    //get user and article refs
    const userRef = db.collection("Users").doc(this.props.auth.uid);
    const articleRef = db
      .collection("Articles")
      .doc(this.props.location.pathname.slice(9));

    return userRef.get().then((doc) => {
      //check if user has voted
      if (
        doc
          .data()
          .positiveRatings.includes(this.props.location.pathname.slice(9)) ||
        doc
          .data()
          .negativeRatings.includes(this.props.location.pathname.slice(9))
      ) {
        this.setState({ hasRatedPositive: true });
        console.log(
          "only rate somthing once!, hasRatedPositive is set to: " +
            this.state.hasRatedPositive
        );
      }

      //update voted articles array
      else
        userRef
          .update({
            positiveRatings: [
              ...doc.data().positiveRatings,
              this.props.location.pathname.slice(9),
            ],
          })
          .then(() => {
            //update votes
            return articleRef.update({
              positiveRatings: firebase.firestore.FieldValue.increment(1),
            });
          });
      //update user array
    });
  };
  negativeRating = () => {
    //get user and article refs
    const userRef = db.collection("Users").doc(this.props.auth.uid);
    const articleRef = db
      .collection("Articles")
      .doc(this.props.location.pathname.slice(9));

    return userRef.get().then((doc) => {
      //check if user has voted
      if (
        doc
          .data()
          .positiveRatings.includes(this.props.location.pathname.slice(9)) ||
        doc
          .data()
          .negativeRatings.includes(this.props.location.pathname.slice(9))
      ) {
        this.setState({ hasRatedNegative: true });
        console.log(
          "only rate somthing once!, hasRatedNegative is set to: " +
            this.state.hasRatedNegative
        );
      }

      //update voted articles array
      else
        userRef
          .update({
            negativeRatings: [
              ...doc.data().negativeRatings,
              this.props.location.pathname.slice(9),
            ],
          })
          .then(() => {
            //update votes
            return articleRef.update({
              negativeRatings: firebase.firestore.FieldValue.increment(1),
            });
          });
      //update user array
    });
  };

  render() {
    return (
      <Container style={{ paddingLeft: 0, paddingRight: 0 }}>
        <div className={classes.Button}>
          {this.state.hasRatedPositive ? (
            <Button
              style={{
                fontFamily: "monospace",
                borderRadius: 0,
                fontSize: "14px",
                width: "6rem",
                marginRight: "1rem",
              }}
              color="success"
              disabled
            >
              <srong>GOOD</srong>
            </Button>
          ) : (
            <Button
              style={{
                fontFamily: "monospace",
                borderRadius: 0,
                fontSize: "14px",
                width: "6rem",
                marginRight: "1rem",
              }}
              outline
              color="success"
              onClick={() => this.positiveRating()}
            >
              <srong>GOOD</srong>
            </Button>
          )}
          {this.state.hasRatedNegative ? (
            <Button
              style={{
                fontFamily: "monospace",
                borderRadius: 0,
                fontSize: "14px",
                width: "6rem",
              }}
              color="danger"
              disabled
            >
              <strong>UNGOOD</strong>
            </Button>
          ) : (
            <Button
              style={{
                fontFamily: "monospace",
                borderRadius: 0,
                fontSize: "14px",
                width: "6rem",
              }}
              outline
              color="danger"
              onClick={() => this.negativeRating()}
            >
              <strong>UNGOOD</strong>
            </Button>
          )}
        </div>
      </Container>
    );
  }
}

export default ArticleRate;
