import React, { Component } from "react";
import firebase from "../../Config/firebase";
import { Button, Container } from "reactstrap";

class ArticleRate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articleRate: {
        createUserID: "",
        createDate: new Date(),
        positiveRating: "",
        negativeRating: "",
      },
    };
  }

  onClickPositive = () => {
    this.setState({
      articleRate: {
        ...this.state.articleRate,
        positiveRating: true,
        negativeRating: false,
      },
    });
  };

  onClickNegative = () => {
    this.setState({
      articleRate: {
        ...this.state.articleRate,
        positiveRating: false,
        negativeRating: true,
      },
    });
  };

  render() {
    return (
      <Container>
        <Button onClick={this.onClickPositive}>+</Button>
        <Button onClick={this.onClickNegative}>-</Button>
      </Container>
    );
  }
}

export default ArticleRate;
