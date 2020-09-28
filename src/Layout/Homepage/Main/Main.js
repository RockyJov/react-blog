import React, { Component } from "react";
import { Container } from "reactstrap";
import ArticleCard from "../../../Component/ArticleCard/ArticleCard";
import firebase from "../../../Config/firebase";
import classes from "./Main.module.css";

// prieinam prie duomenu bazes firestorei
const db = firebase.firestore();

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      articles: [],
    };
  }

  componentDidMount() {
    this.getMyArticles();
  }
  // imam colletiona pavadinimu "Articles", sukuriu array allArticles, tada imu kiekviena elementa is Articles, ir idedu i articles[] array,
  //  kuris yra konstruktoriuje, naudodamas setState, kartu ir pakeiciu isLoaded i true

  getMyArticles = () => {
    db.collection("Articles")
      .orderBy("createDate", "desc")
      // .limit(10)
      .get()
      .then((docs) => {
        if (!docs.empty) {
          let allArticles = [];
          docs.forEach(function (doc) {
            const article = {
              id: doc.id,
              ...doc.data(),
            };
            allArticles.push(article);
          });
          this.setState(
            {
              articles: allArticles,
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
        <Container className={classes.Main}>
          {this.state.isLoaded
            ? this.state.articles.map((article, index) => {
                return <ArticleCard key={index} data={article} />;
              })
            : ""}
        </Container>
      </div>
    );
  }
}

export default Main;
