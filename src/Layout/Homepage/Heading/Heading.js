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
  Collapse,
} from "reactstrap";
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
        <NavbarBrand href="#">My blog</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/">New Article</NavLink>
            </NavItem>
          </Nav>
          <UncontrolledDropdown>
            <DropdownToggle nav caret>
              Options
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>Log In</DropdownItem>
              <DropdownItem>Log Out</DropdownItem>
              <DropdownItem>Anonymous</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Collapse>
      </Navbar>
    );
  }
}

export default Heading;
