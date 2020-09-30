import React, { Component } from "react";
import { Container, Button } from "reactstrap";
import ArticleCard from "../../../Component/ArticleCard/ArticleCard";
import firebase from "../../../Config/firebase";
import classes from "./Main.module.css";
import InfiniteScroll from "react-infinite-scroll-component";

// prieinam prie duomenu bazes firestorei
const db = firebase.firestore();

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      articles: [],
      limit: 2,
      lastArticle: null,
      orderBy: "createDate",
    };
  }

  nextArticle = () => {
    //get last state we added from getUsers()
    let last = this.state.lastArticle;
    db.collection("Articles")
      .orderBy(this.state.orderBy, "desc")
      .startAfter(last.createDate)
      .limit(1)
      .get()
      .then((docs) => {
        if (!docs.empty) {
          var last = this.state.articles[this.state.articles.length - 1];
          let allArticles = [];
          docs.forEach(function (doc) {
            const article = {
              id: doc.id,
              ...doc.data(),
            };
            allArticles.push(article);
          });
          //set state with updated array of data
          //also save last fetched data in state
          let updated_articles = this.state.articles.concat(allArticles);
          this.setState(
            {
              articles: updated_articles,
              lastArticle: last,
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

  componentDidMount() {
    this.getMyArticles();
  }
  // imam colletiona pavadinimu "Articles", sukuriu array allArticles, tada imu kiekviena elementa is Articles, ir idedu i articles[] array,
  //  kuris yra konstruktoriuje, naudodamas setState, kartu ir pakeiciu isLoaded i true

  getMyArticles = () => {
    db.collection("Articles")
      .orderBy(this.state.orderBy, "desc")
      .limit(this.state.limit)
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
                lastArticle: this.state.articles[
                  this.state.articles.length - 1
                ],
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
        <button onClick={() => this.nextArticle()}>ss</button>
        <button onClick={() => console.log(this.state.lastArticle)}>ss</button>
      </div>
    );
  }
}

export default Main;
