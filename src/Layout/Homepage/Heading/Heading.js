import React, { Component } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavbarToggler,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Button,
  Collapse,
  Badge,
  Modal,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  ModalHeader,
  TabContent,
  TabPane,
} from "reactstrap";
import classes from "./Heading.module.css";
import { connect } from "react-redux";
import firebase from "../../../Config/firebase";
import Info from "../../Info/Info";
// kokia sios klases paskirtis? Naudoju kelis reactstrap componentus headeri. Collapse componentas turi isOpen property, kuri default bus
// false. naudojant toggle metoda, paspaudus atnaujinam isOpen property is false i true, kodel? nezinau
class Heading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //navbar  toggler
      isOpen: false,
      isInfoOpen: false,
    };
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

  login = () => {
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        return firebase.auth().signInAnonymously();
      });
  };

  render() {
    return (
      <div>
        {this.props.auth.isLoaded && (
          <Navbar
            className={classes.Navbar}
            expand="xs"
            color="light"
            fixed="top"
          >
            <NavbarBrand style={{ marginRight: 0 }} href="/">
              {" "}
              <img
                className={classes.Logo}
                src="https://firebasestorage.googleapis.com/v0/b/react-blog-a39d2.appspot.com/o/LogoMakr_85Wfsy.png?alt=media&token=46c44cf2-16d2-4636-ac42-1e4ef459c9c1"
                alt="Logo"
              />
            </NavbarBrand>
            <Nav className="mr-auto" navbar>
              {this.props.auth.isEmpty ? (
                <NavItem>
                  <Button
                    style={{ borderRadius: 0, fontFamily: "monospace" }}
                    outline
                    color="dark"
                    size="sm"
                    onClick={() => this.login()}
                  >
                    <strong>CREATE ID</strong>
                  </Button>
                </NavItem>
              ) : (
                <NavItem>
                  <Button
                    style={{ borderRadius: 0, fontFamily: "monospace" }}
                    outline
                    color="dark"
                    size="sm"
                    href="/new-article"
                  >
                    <strong>CREATE POST</strong>
                  </Button>
                </NavItem>
              )}
            </Nav>

            <NavbarToggler onClick={this.toggle}></NavbarToggler>
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav navbar className="ml-auto">
                <NavItem>
                  {" "}
                  <Button
                    style={{ borderRadius: 0, fontFamily: "monospace" }}
                    outline
                    color="dark"
                    size="sm"
                    onClick={() => this.setState({ isInfoOpen: true })}
                  >
                    <strong>INFO</strong>
                  </Button>
                </NavItem>
                {/* {this.props.auth.isEmpty ? (
                  <NavItem>
                    {" "}
                    <Button
                      style={{ borderRadius: 0, fontFamily: "monospace" }}
                      outline
                      color="dark"
                      size="sm"
                    >
                      <strong>INFO</strong>
                    </Button>
                  </NavItem>
                ) : (
                  <NavItem>
                    <Badge> Logged in as: {this.props.auth.uid}</Badge>{" "}
                    <Button
                      style={{ borderRadius: 0, fontFamily: "monospace" }}
                      outline
                      color="dark"
                      size="sm"
                      onClick={() => firebase.auth().signOut()}
                    >
                      <strong>LOGOUT</strong>
                    </Button>
                  </NavItem>
                )} */}
              </Nav>
            </Collapse>
          </Navbar>
        )}
        <Modal
          toggle={() => this.setState({ isInfoOpen: !this.state.isInfoOpen })}
          centered="true"
          isOpen={this.state.isInfoOpen}
          size="lg"
        >
          {/* <ModalHeader
            toggle={() => {
             
            }}
          ></ModalHeader> */}
          <ModalBody
            style={{
              "max-height": "calc(100vh - 210px)",
              "overflow-y": "auto",
            }}
          >
            <Info />
          </ModalBody>
          <ModalFooter style={{ padding: 0 }}>
            Contact me @ mail.com
            <Button
              onClick={() =>
                this.setState({ isInfoOpen: !this.state.isInfoOpen })
              }
              size="sm"
              color="danger"
              className="ml-auto"
            >
              CLOSE{" "}
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const enhance = connect(({ firebase: { auth, profile } }) => ({
  auth,
  profile,
}));

export default enhance(Heading);
