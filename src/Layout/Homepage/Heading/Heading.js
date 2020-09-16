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
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Logo</NavbarBrand>
        {/* <NavbarToggler onClick={this.toggle} /> */}
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {this.props.auth.isEmpty ? (
              ""
            ) : (
              <NavItem>
                <NavLink href="/new-article">New Article</NavLink>
              </NavItem>
            )}
          </Nav>
          {this.props.auth.isEmpty
            ? ""
            : "Hi, " + this.props.auth.uid.slice(0, 10)}
          {/* <UncontrolledDropdown>
            <DropdownToggle nav caret>
              Options
            </DropdownToggle>
            <DropdownMenu>
              {this.props.auth.isEmpty ? (
                <DropdownItem>
                  <Link to={{ pathname: "/login" }}>Log In</Link>
                </DropdownItem>
              ) : (
                <DropdownItem>
                  <Button onClick={() => firebase.auth().signOut()}>
                    Logout
                  </Button>
                </DropdownItem>
              )}
            </DropdownMenu>
          </UncontrolledDropdown> */}
          <Nav className={classes.LoginButton}>
            {this.props.auth.isEmpty ? (
              <Button onClick={() => firebase.auth().signInAnonymously()}>
                Log in
              </Button>
            ) : (
              <Button onClick={() => firebase.auth().signOut()}>Logout</Button>
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
