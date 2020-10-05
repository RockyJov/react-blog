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
  Modal,
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
    this.state = {
      isOpen: false,
    };
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

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
      <Navbar color="light" light expand="md" fixed="top">
        <NavbarBrand href="/">
          {" "}
          <img
            className={classes.Logo}
            src="https://firebasestorage.googleapis.com/v0/b/react-blog-a39d2.appspot.com/o/LogoMakr_85Wfsy.png?alt=media&token=46c44cf2-16d2-4636-ac42-1e4ef459c9c1"
          />
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <Button
                style={{ borderRadius: 0 }}
                outline
                color="dark"
                size="sm"
              >
                CREATE A COMMENT
              </Button>
            </NavItem>
            {this.props.auth.isEmpty ? (
              <NavItem>
                <Button
                  style={{ borderRadius: 0 }}
                  outline
                  color="dark"
                  size="sm"
                  onClick={() => firebase.auth().signInAnonymously()}
                >
                  CREATE MY ID
                </Button>
              </NavItem>
            ) : (
              <NavItem>
                <Button
                  style={{ borderRadius: 0 }}
                  outline
                  color="dark"
                  size="sm"
                  href="/new-article"
                >
                  CREATE AN ARTICLE
                </Button>
              </NavItem>
            )}
          </Nav>
          <Nav navbar>
            {this.props.auth.isEmpty ? (
              <NavItem>
                {" "}
                <Button
                  style={{ borderRadius: 0 }}
                  outline
                  color="dark"
                  size="sm"
                >
                  INFO
                </Button>
              </NavItem>
            ) : (
              <NavItem>
                {" "}
                <Button
                  style={{ borderRadius: 0 }}
                  outline
                  color="dark"
                  size="sm"
                  onClick={() => firebase.auth().signOut()}
                >
                  LOGOUT
                </Button>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

const enhance = connect(({ firebase: { auth, profile } }) => ({
  auth,
  profile,
}));

export default enhance(Heading);
