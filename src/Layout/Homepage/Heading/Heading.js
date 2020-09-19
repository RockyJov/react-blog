import React, { Component } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarToggler,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Button,
  Collapse,
} from "reactstrap";
import classes from "./Heading.module.css";
import { connect } from "react-redux";
import firebase from "../../../Config/firebase";
import { Link } from "react-router-dom";

// kokia sios klases paskirtis? Naudoju kelis reactstrap componentus headeri. Collapse componentas turi isOpen property, kuri default bus
// false. naudojant toggle metoda, paspaudus atnaujinam isOpen property is false i true, kodel? nezinau
class Heading extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  //react-blog-server folder
  componentWillReceiveProps(nextProps, nextContext) {
    if (!nextProps.auth.isEmpty) {
      firebase
        .auth()
        .currentUser.getIdTokenResult()
        .then((claim) => {
          console.log(claim);
        });
    }
  }

  render() {
    return (
      <Navbar className={classes.NavBar} fixed="top">
        <NavbarBrand href="/">
          <img src="LogoMakr_7K8oLF.png" />
        </NavbarBrand>

        <Nav>
          {this.props.auth.isEmpty ? (
            <NavItem className={classes.MainButton}>
              <Button
                outline
                color="info"
                size="sm"
                onClick={() => firebase.auth().signInAnonymously()}
              >
                Create my ID
              </Button>
            </NavItem>
          ) : (
            <NavItem className={classes.MainButton}>
              <Button outline color="info" size="sm" href="/new-article">
                Create a post as {this.props.auth.uid.slice(0, 7)}
              </Button>
            </NavItem>
          )}
        </Nav>

        <Nav className={classes.AboutButton}>
          {this.props.auth.isEmpty ? (
            <Button outline color="info" size="sm">
              ?
            </Button>
          ) : (
            <Button
              outline
              color="info"
              size="sm"
              onClick={() => firebase.auth().signOut()}
            >
              !
            </Button>
          )}
        </Nav>
      </Navbar>
    );
  }
}

const enhance = connect(({ firebase: { auth, profile } }) => ({
  auth,
  profile,
}));

export default enhance(Heading);
