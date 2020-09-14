import React, { Component } from "react";
import { Button } from "reactstrap";
import firebase from "../../Config/firebase";
import NewComment from "../../NewComment/NewComment";

const db = firebase.firestore();
class ReplyComment extends Component {
  constructor(props) {
    super(props);
  }
  scroll = () => {};
  render() {
    return (
      <div>
        <Button>Reply</Button>
      </div>
    );
  }
}

export default ReplyComment;
