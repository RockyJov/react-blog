import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Label,
  Input,
  Alert,
  Button,
  Form,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import classes from "./NewComment.module.css";
import ReactQuill from "react-quill";
import Recaptcha from "react-recaptcha";

import "react-quill/dist/quill.snow.css";
import firebase from "../Config/firebase";
import { v4 as uuidv4 } from "uuid";
import Compressor from "compressorjs";

const db = firebase.firestore();
const storageRef = firebase.storage();
let recaptchaInstance;

class NewComment extends Component {
  constructor(props) {
    super(props);
    this.verifyCallback = this.verifyCallback.bind(this);
    this.expiredCallback = this.expiredCallback.bind(this);
    this.onChangeCommentContent = this.onChangeCommentContent.bind(this);
    this.quillRef = null; // Quill instance
    this.reactQuillRef = null;

    this.state = {
      isModalOpen: false,
      isVerified: false,
      hasFeatureImage: false,

      comment: {
        commentID: "",
        content: "",
        createDate: "",
        featureImage: "",
        createUserID: "",
      },
    };
  }

  modules = {
    toolbar: {
      container: [
        [{ size: [] }],
        ["bold", "italic", "underline", "strike"],
        // [{ list: "ordered" }, { list: "bullet" }],
        ["link"],
        // ["code-block"],
      ],
      handlers: {
        image: () => this.quillImageCallBack(),
      },
    },
    clipboard: {
      matchVisual: false,
    },
  };

  formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    // "blockquote",
    // "list",
    // "bullet",
    // "indent",
    "link",
    // "image",
    // "video",
    // "code-block",
  ];

  componentDidMount() {
    this.attachQuillRefs();
  }

  componentDidUpdate() {
    this.attachQuillRefs();
  }

  attachQuillRefs = () => {
    if (typeof this.reactQuillRef.getEditor !== "function") return;
    this.quillRef = this.reactQuillRef.getEditor();
  };

  onChangeCommentContent = (value) => {
    const limit = 10000;
    var quill = this.quillRef;
    quill.on("text-change", function (delta, old, source) {
      if (quill.getLength() > limit) {
        quill.deleteText(limit, quill.getLength());
      }
    });
    this.setState({
      comment: {
        ...this.state.comment,
        content: value,
      },
    });
  };

  verifyCallback(response) {
    if (response) {
      this.setState({
        isVerified: true,
      });
    }
  }
  expiredCallback() {
    this.setState({
      isVerified: false,
    });
  }

  submitComment = () => {
    const aid = window.location.pathname.slice(9);
    this.state.comment.createUserID = firebase.auth().currentUser.uid;

    // const comment = this.state.comment;

    this.setState(
      {
        hasFeatureImage: false,
        comment: {
          ...this.state.comment,
          createDate: new Date(),
        },
      },
      () => {
        db.collection("Articles")
          .doc(aid)
          .collection("Comments")
          .add(this.state.comment)
          .then((res) => {})
          .catch((err) => console.log(err));
        this.reactQuillRef
          .getEditor()
          .deleteText(0, this.reactQuillRef.getEditor().getLength());
        this.setState({
          isModalOpen: !this.state.isModalOpen,
          comment: {
            ...this.state.comment,
            featureImage: "",
            content: "",
          },
        });
      }
    );

    const articleRef = db.collection("Articles").doc(aid);
    articleRef.update({
      commentCount: firebase.firestore.FieldValue.increment(1),
    });
    recaptchaInstance.reset();
  };

  fileCompress = (file) => {
    return new Promise((resolve, reject) => {
      new Compressor(file, {
        file: "File",
        quality: 0.5,
        maxWidth: 640,
        maxHeight: 640,
        success(file) {
          return resolve({
            success: true,
            file: file,
          });
        },
        error(err) {
          return resolve({
            success: false,
            message: err.message,
          });
        },
      });
    });
  };

  deleteImageCallBack = (e) => {
    const fileName = this.state.comment.featureImage.slice(86, 122);
    storageRef
      .ref()
      .child("Comments/" + fileName)
      .delete()
      .then(() => {
        this.setState({
          hasFeatureImage: false,
          comment: {
            ...this.state.comment,
            featureImage: "",
          },
        });
        console.log("file deleted!" + this.state.comment.featureImage);
      })
      .catch(function (error) {
        console.log("nothing to delete!");
      });
  };

  uploadImageCallBack = (e) => {
    return new Promise(async (resolve, reject) => {
      const file = e.target.files[0];
      const fileName = uuidv4();
      storageRef
        .ref()
        .child("Comments/" + fileName)
        .put(file)
        .then(async (snapshot) => {
          const downloadURL = await storageRef
            .ref()
            .child("Comments/" + fileName)
            .getDownloadURL();
          resolve({
            success: true,
            data: { link: downloadURL },
          });
        });
    });
  };

  toggleModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  };

  render() {
    function removeTags(str) {
      if (str === null || str === "") return false;
      else str = str.toString();
      return str.replace(/(<([^>]+)>)/gi, "");
    }
    const submitButtonCondition =
      this.state.isVerified &&
      (removeTags(this.state.comment.content).length >= 1 ||
        this.state.comment.featureImage.length != 0);
    return (
      <Container className={classes.NewCommentMain}>
        <Modal
          toggle={() => this.setState({ isModalOpen: !this.state.isModalOpen })}
          isOpen={this.state.isModalOpen}
        >
          <ModalBody>
            {" "}
            <FormGroup>
              {/* <header className={classes.Label}> Feature Image</header> */}
              <Input
                type="file"
                accept="image/*"
                className={classes.ImageUploader}
                onChange={async (e) => {
                  const uploadState = await this.uploadImageCallBack(e);
                  if (uploadState.success) {
                    this.setState({
                      hasFeatureImage: true,
                      comment: {
                        ...this.state.comment,
                        featureImage: uploadState.data.link,
                      },
                    });
                    console.log(
                      "Comment Image has been uploaded to:" +
                        uploadState.data.link
                    );
                  }
                }}
              ></Input>

              {this.state.hasFeatureImage ? (
                <header className={classes.ImageUploaded}>
                  <img
                    src={this.state.comment.featureImage}
                    className={classes.FeatureImg}
                  />
                  <Button onClick={() => this.deleteImageCallBack()}>X</Button>
                </header>
              ) : (
                ""
              )}
            </FormGroup>
            <FormGroup>
              {/* <header class="border-bottom-0" className={classes.Label}>
                Content
              </header> */}
              <ReactQuill
                ref={(el) => (this.reactQuillRef = el)}
                value={this.state.comment.content}
                onChange={(e) => this.onChangeCommentContent(e)}
                placeholder="Type in a comment..."
                theme="snow"
                modules={this.modules}
                formats={this.formats}
              />
            </FormGroup>
            <FormGroup>
              <Recaptcha
                ref={(e) => (recaptchaInstance = e)}
                sitekey="6LeF59IZAAAAAK3nudAyu9wQDemGRHGN1LltZ95C"
                render="explicit"
                verifyCallback={this.verifyCallback}
                expiredCallback={this.expiredCallback}
              />
            </FormGroup>{" "}
            <FormGroup>
              {!submitButtonCondition ? (
                <Button
                  className="mr-auto"
                  style={{ borderRadius: 0 }}
                  color="dark"
                  disabled
                >
                  {" "}
                  SUBMIT
                </Button>
              ) : (
                <Button
                  className="mr-auto"
                  style={{ borderRadius: 0 }}
                  color="dark"
                  onClick={(e) => this.submitComment()}
                >
                  {" "}
                  SUBMIT
                </Button>
              )}
              <Button
                className="ml-auto"
                style={{ borderRadius: 0 }}
                color="dark"
                onClick={(e) =>
                  this.setState({ isModalOpen: !this.state.isModalOpen })
                }
              >
                {" "}
                CLOSE
              </Button>
            </FormGroup>
          </ModalBody>
        </Modal>

        <FormGroup style={{ textAlign: "center" }}>
          {" "}
          <Button
            style={{ borderRadius: 0 }}
            size="sm"
            outline
            color="dark"
            onClick={(e) => this.toggleModal()}
          >
            {" "}
            CREATE A REPLY
          </Button>
        </FormGroup>
        <ReactQuill
          //
          className={classes.TextEditor}
          ref={(el) => (this.reactQuillRef = el)}
          value={this.state.comment.content}
          onChange={(e) => this.onChangeCommentContent(e)}
          placeholder="Type in a comment..."
          theme="snow"
          modules={this.modules}
          formats={this.formats}
        />
      </Container>
    );
  }
}

export default NewComment;
