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
      createUserID: "",
      createDate: new Date(),
      visible: true,
      count: null,
    };
  }

  async componentDidMount() {
    const aid = this.props.location.pathname.slice(9);

    const ref = db.collection("Articles").doc(aid);
    await ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          count: doc.data().count,
        });
      } else {
        console.log("No such doc exists!"); 
    });
  }

  increment = async () => {
    const aid = this.props.location.pathname.slice(9);

    const ref = db.collection("Articles").doc(aid);
    ref.update({ count: increment });
    await ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          count: doc.data().count,
        });
      } else {
        console.log("No such doc exists!");
      }
    });
  };

  decrement = () => {
    const aid = this.props.location.pathname.slice(9);

    const ref = db.collection("Articles").doc(aid);
    ref.update({ count: decrement });
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          count: doc.data().count,
        });
      } else {
        console.log("No such doc exists!");
      }
    });
  };

  render() {
    return (
      <Container>
        <div className={classes.Rate}>
          <h1>Rate this article</h1>
          {this.state.visible ? (
            <div className={classes.Button}>
              {" "}
              <Button onClick={(e) => this.increment()}>+</Button>
              <Button onClick={(e) => this.decrement()}>-</Button>
              <h2>{this.state.count}</h2>
            </div>
          ) : null}
        </div>
      </Container>
    );
  }
}

export default ArticleRate;
