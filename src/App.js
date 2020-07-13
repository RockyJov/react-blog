// instaliuoti packages kolkas:
// reactstrap;
// bootstrap;
// react;
// react-dom;
// firebase;
// react-router-dom
import React from "react";
import Main from "./Layout/Homepage/Main/Main.js";
import Heading from "./Layout/Homepage/Heading/Heading.js";
import ViewArticle from "./Layout/ViewArticle/ViewArticle";
import NewArticle from "./Layout/NewArticle/NewArticle";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Heading />
        <Switch>
          <Route path="/" exact>
            <Main />
          </Route>
          <Route path="/article/:id">
            <ViewArticle />
          </Route>
          <Route path="/new-article">
            <NewArticle />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
