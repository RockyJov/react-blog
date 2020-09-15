import React, { Component } from "react";
import { Button } from "reactstrap";
import firebase from "../../Config/firebase";
import NewComment from "../../NewComment/NewComment";

const db = firebase.firestore();
class ReplyComment extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onClickReplyHandler = () => {
    this.commentsEnd.scrollIntoView({ behaviour: "smooth" });
  };

  render() {
    return (
      <div>
        <Button onClick={() => this.onClickReplyHandler()}>Reply</Button>
        <div
          ref={(el) => {
            this.commentsEnd = el;
          }}
        ></div>
      </div>
    );
  }
}

export default ReplyComment;
