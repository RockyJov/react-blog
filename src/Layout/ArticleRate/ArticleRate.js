import React, { Component } from "react";
import firebase from "../../Config/firebase";
import classes from "./ArticleRate.module.css";
import { Button, Container } from "reactstrap";
import { isEmpty } from "react-redux-firebase";

class ArticleRate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    };
  }

  render() {
    return (
      <Container>
        <div className={classes.Rate}>
          <h1>Rate this article</h1>
          {this.state.visible ? (
            <div className={classes.Button}>
              {" "}
              <Button>+</Button>
              <Button>-</Button>
            </div>
          ) : null}
        </div>
      </Container>
    );
  }
}

export default ArticleRate;
