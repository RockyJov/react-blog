import React, { Component } from "react";
import { Container } from "reactstrap";
import CommentCard from "../../Component/CommentCard/CommentCard";
import firebase from "../../Config/firebase";

// prieinam prie duomenu bazes firestorei
const db = firebase.firestore();

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      comments: [],
    };
  }

  componentDidMount() {
    this.getMyComments();
  }
  // imam colletiona pavadinimu "Articles", sukuriu array allArticles, tada imu kiekviena elementa is Articles, ir idedu i articles[] array,
  //  kuris yra konstruktoriuje, naudodamas setState, kartu ir pakeiciu isLoaded i true

  getMyComments = () => {
    const aid = window.location.pathname.slice(9);

    db.collection("Articles")
      .doc(aid)
      .collection("Comments")
      .limit(10)
      .get()
      .then((docs) => {
        if (!docs.empty) {
          let allComments = [];
          docs.forEach(function (doc) {
            const comment = {
              id: doc.id,
              ...doc.data(),
            };
            allComments.push(comment);
          });
          this.setState(
            {
              comments: allComments,
            },
            () => {
              this.setState({
                isLoaded: true,
              });
            }
          );
        }
      });
  };

  render() {
    // jei isLoaded yra true, tada einu per kiekviena article ir renderinu kievkiena article, jei isLoaded yra flase, nedarau nieko
    return (
      <div>
        <Container>
          {this.state.isLoaded
            ? this.state.comments.map((comment, index) => {
                return <CommentCard key={index} data={comment} />;
              })
            : ""}
        </Container>
      </div>
    );
  }
}

export default Comments;
