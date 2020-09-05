import React, { Component } from "react";
import firebase from "../../Config/firebase";
import classes from "./ArticleRate.module.css";
import { Button, Container } from "reactstrap";
import { isEmpty } from "react-redux-firebase";

const db = firebase.firestore();
const increment = firebase.firestore.FieldValue.increment(1);
const decrement = firebase.firestore.FieldValue.increment(-1);

class ArticleRate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articleRate: {
        createUserID: "",
        createDate: new Date(),
        visible: true,
      },
    };
  }

  increment = () => {
    const aid = this.props.location.pathname.slice(9);

    const ref = db.collection("Articles").doc(aid);
    ref.update({ count: increment });
  };

  decrement = () => {
    const aid = this.props.location.pathname.slice(9);

    const ref = db.collection("Articles").doc(aid);
    ref.update({ count: decrement });
  };

  render() {
    return (
      <Container>
        <div className={classes.Rate}>
          <h1>Rate this article</h1>
          {this.state.articleRate.visible ? (
            <div className={classes.Button}>
              {" "}
              <Button onClick={(e) => this.increment()}>+</Button>
              <Button onClick={(e) => this.decrement()}>-</Button>
            </div>
          ) : null}
        </div>
      </Container>
    );
  }
}

export default ArticleRate;
