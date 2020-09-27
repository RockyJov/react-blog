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
  Button,
  Form,
} from "reactstrap";
import classes from "./NewArticle.module.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import firebase from "../../Config/firebase";
import { v4 as uuidv4 } from "uuid";
import Compressor from "compressorjs";
import { isEmpty } from "react-redux-firebase";

const db = firebase.firestore();
const storageRef = firebase.storage();

class NewArticle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      article: {
        title: "",
        content: "",
        createDate: new Date(),
        featureImage: "",
        positiveRatings: 0,
        negativeRatings: 0,
        createUserID: "",
      },
    };
  }

  modules = {
    toolbar: {
      container: [
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "video"],
        ["code-block"],
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
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "code-block",
  ];

  onChangeArticleTitle = (value) => {
    this.setState({
      article: {
        ...this.state.article,
        title: value,
      },
    });
  };

  onChangeArticleContent = (value) => {
    this.setState({
      article: {
        ...this.state.article,
        content: value,
      },
    });
  };

  // seconds not defined

  submitArticle = () => {
    const article = this.state.article;
    article.createUserID = this.props.auth.uid;
    db.collection("Articles")
      .add(article)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
    this.props.history.push("/");
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

  quillImageCallBack = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      const compressState = await this.fileCompress(file);
      if (compressState.success) {
        const fileName = uuidv4();
        storageRef
          .ref()
          .child("Articles/" + fileName)
          .put(compressState.file)
          .then(async (snapshot) => {
            const downloadURL = await storageRef
              .ref()
              .child("Articles/" + fileName)
              .getDownloadURL();
            let quill = this.quill.getEditor();
            const range = quill.getSelection(true);
            quill.insertEmbed(range.index, "image", downloadURL);
          });
      }
    };
  };

  uploadImageCallBack = (e) => {
    return new Promise(async (resolve, reject) => {
      const file = e.target.files[0];
      const fileName = uuidv4();
      storageRef
        .ref()
        .child("Articles/" + fileName)
        .put(file)
        .then(async (snapshot) => {
          const downloadURL = await storageRef
            .ref()
            .child("Articles/" + fileName)
            .getDownloadURL();
          resolve({
            success: true,
            data: { link: downloadURL },
          });
        });
    });
  };

  render() {
    const submitButtonCondition =
      this.state.article.content.length >= 12 &&
      this.state.article.title.length >= 1 &&
      this.state.article.featureImage.length != 0;
    return (
      <Container className={classes.NewArticleMain}>
        <Row>
          <Col sn={12}>
            <FormGroup>
              <header class="border-bottom-0" className={classes.Label}>
                Feature Image
              </header>
              <Input
                type="file"
                accept="image/*"
                className={classes.ImageUploader}
                onChange={async (e) => {
                  const uploadState = await this.uploadImageCallBack(e);
                  if (uploadState.success) {
                    this.setState({
                      hasFeatureImage: true,
                      article: {
                        ...this.state.article,
                        featureImage: uploadState.data.link,
                      },
                    });
                  }
                  console.log(
                    "Image uploaded to firebase" + uploadState.data.link
                  );
                }}
              ></Input>

              {this.state.hasFeatureImage ? (
                <header className={classes.ImageUploaded}>
                  {" "}
                  <img
                    src={this.state.article.featureImage}
                    className={classes.FeatureImg}
                  />
                </header>
              ) : (
                ""
              )}
            </FormGroup>
            <FormGroup>
              <header class="border-bottom-0" className={classes.Label}>
                Title
              </header>
              <Input
                style={{ borderRadius: 0 }}
                type="text"
                placeholder="Type in a title of you article..."
                name="articleTitle"
                id="articleTitle"
                onChange={(e) => this.onChangeArticleTitle(e.target.value)}
                value={this.state.article.title}
              />
            </FormGroup>
            <FormGroup>
              <header class="border-bottom-0" className={classes.Label}>
                Content
              </header>
              <ReactQuill
                ref={(el) => (this.quill = el)}
                value={this.state.article.content}
                onChange={(e) => this.onChangeArticleContent(e)}
                placeholder="Type in something or upload a picture..."
                theme="snow"
                modules={this.modules}
                formats={this.formats}
              />
            </FormGroup>
            {!submitButtonCondition ? (
              <FormGroup>
                <Button
                  style={{ borderRadius: 0 }}
                  color="dark"
                  onClick={(e) => this.submitArticle()}
                  disabled
                >
                  {" "}
                  SUBMIT
                </Button>
              </FormGroup>
            ) : (
              <FormGroup>
                <Button
                  style={{ borderRadius: 0 }}
                  color="dark"
                  onClick={(e) => this.submitArticle()}
                >
                  {" "}
                  SUBMIT
                </Button>
              </FormGroup>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default NewArticle;
