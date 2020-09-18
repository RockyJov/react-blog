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
        <NavbarBrand className={classes.Logo} href="/">
          Logo
        </NavbarBrand>

        <Nav>
          {this.props.auth.isEmpty ? (
            <NavItem>
              <Button
                onClick={() => firebase.auth().signInAnonymously()}
              ></Button>
            </NavItem>
          ) : (
            <NavItem>
              <Button href="/new-article">Create a post</Button>
            </NavItem>
          )}
        </Nav>

        <Nav className={classes.AboutButton}>
          {this.props.auth.isEmpty ? (
            <Button>?</Button>
          ) : (
            <Button onClick={() => firebase.auth().signOut()}>!</Button>
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
