// instaliuoti packages kolkas:
// reactstrap;
// bootstrap;
// react;
// react-dom;
// firebase;
// react-router-dom
// htlm-react-parser
// react-quill
// react-redux-firebase
// react-firebaseui
// react-redux
// redux
import React from "react";
import Main from "./Layout/Homepage/Main/Main.js";
import Heading from "./Layout/Homepage/Heading/Heading.js";
import ViewArticle from "./Layout/ViewArticle/ViewArticle";
import NewArticle from "./Layout/NewArticle/NewArticle";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { getReduxStore, getRrfProp } from "./Config/firebase-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import LoginPage from "./Layout/LoginPage/LoginPage";

function App() {
  return (
    <div className="App">
      {/* enableLoggin issue provider or ReactReduxFirebaseProvider */}
      <Provider store={getReduxStore()}>
        <ReactReduxFirebaseProvider {...getRrfProp()}>
          <Router>
            <Heading />
            <Switch>
              <Route path="/" exact>
                <Main />
              </Route>
              <Route path="/login">
                <LoginPage />
              </Route>
              <Route path="/article/:id">
                <ViewArticle />
              </Route>
              <Route path="/new-article">
                <NewArticle />
              </Route>
            </Switch>
          </Router>
        </ReactReduxFirebaseProvider>
      </Provider>
    </div>
  );
}

export default App;
