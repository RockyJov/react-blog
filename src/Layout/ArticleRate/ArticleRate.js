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
          .positiveRatings.includes(this.props.location.pathname.slice(9))
      ) {
        console.log("only rate somthing once!");
      } else
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
              upvotes: firebase.firestore.FieldValue.increment(1),
            });
          });
      //update user array
    });
  };

  render() {
    return (
      <Container>
        <div className={classes.Rate}>
          <div className={classes.Button}>
            <Button onClick={() => this.positiveRating()}>+</Button>
            <Button>-</Button>
          </div>
        </div>
      </Container>
    );
  }
}

export default ArticleRate;
