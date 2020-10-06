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
import { Link, useLocation } from "react-router-dom";
import NewComment from "../../../NewComment/NewComment";
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
      <div>
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
                    href="/new-post"
                  >
                    CREATE A POST
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
      </div>
    );
  }
}

const enhance = connect(({ firebase: { auth, profile } }) => ({
  auth,
  profile,
}));

export default enhance(Heading);
