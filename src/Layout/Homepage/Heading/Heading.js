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

  render() {
    return (
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">My blog</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/new-article">New Article</NavLink>
            </NavItem>
          </Nav>
          {this.props.auth.isEmpty ? "" : this.props.auth.displayName}
          <UncontrolledDropdown>
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

              <DropdownItem>Anonymous</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
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
