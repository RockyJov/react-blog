import React, { Component } from "react";
import firebase from "../../Config/firebase";
import classes from "./ArticleRate.module.css";
import { Button, Container } from "reactstrap";
import { isEmpty } from "react-redux-firebase";

class ArticleRate extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container>
        <div className={classes.Rate}>
          <div className={classes.Button}>
            <Button>+</Button>
            <Button>-</Button>
          </div>
        </div>
      </Container>
    );
  }
}

export default ArticleRate;
