import React, { Component } from "react";
import firebase from "../../Config/firebase";
import classes from "./ArticleRate.module.css";
import { Button, Container } from "reactstrap";
import { isEmpty } from "react-redux-firebase";

const db = firebase.firestore();

class ArticleRate extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // upvoteArticles = (id) => {
  //   const upvote = firebase.functions().httpsCallable("upvote");
  //   upvote({ id: id }).catch((error) => {
  //     console.log(error.message);
  //   });
  // };

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
        console.log("only rate somthing once!");
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
        console.log("only rate somthing once!");
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
        <div className={classes.Rate}>
          <div className={classes.Button}>
            <Button
              style={{ marginRight: 3 }}
              size="sm"
              outline
              color="dark"
              onClick={() => this.positiveRating()}
            >
              +
            </Button>
            <Button
              style={{ marginLeft: 3 }}
              size="sm"
              outline
              color="dark"
              onClick={() => this.negativeRating()}
            >
              -
            </Button>
          </div>
        </div>
        <hr classeName={classes.HorLine} />
      </Container>
    );
  }
}

export default ArticleRate;
