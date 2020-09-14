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
import classes from "./NewComment.module.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import firebase from "../Config/firebase";
import { v4 as uuidv4 } from "uuid";
import Compressor from "compressorjs";

const db = firebase.firestore();
const storageRef = firebase.storage();

class NewComment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: {
        //title: "",
        articleID: "",
        content: "",
        createDate: new Date(),
        featureImage: "",
        isPublish: "True",
        //lastModified: new Date(),
        createUserID: "",
        reply: "",
      },
    };
  }

  modules = {
    toolbar: {
      container: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image"],
        ["clean"],
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

  // onChangeArticleTitle = (value) => {
  //   this.setState({
  //     article: {
  //       ...this.state.article,
  //       title: value,
  //     },
  //   });
  // };

  onChangeCommentContent = (value) => {
    this.setState({
      comment: {
        ...this.state.comment,
        content: value,
      },
    });
  };

  test = () => {
    this.setState({
      comment: {
        ...this.state.comment,
        reply: "reply",
      },
    });
  };

  onChangePublish = (value) => {
    this.setState({
      comment: {
        ...this.state.comment,
        isPublish: value === "True",
      },
    });
  };

  // seconds not defined

  submitComment = () => {
    const aid = this.props.location.pathname.slice(9);
    const comment = this.state.comment;
    comment.createUserID = this.props.auth.uid;
    db.collection("Articles")
      .doc(aid)
      .collection("Comments")
      .add(comment)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));

    const articleRef = db.collection("Articles").doc(aid);
    articleRef.update({
      commentCount: firebase.firestore.FieldValue.increment(1),
    });
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
          .child("Comments/" + fileName)
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

  render() {
    return (
      <Container>
        <Row>
          <Col xl={9} lg={8} md={8} sn={12}>
            <h2 className={classes.SectionTitle}>Comment</h2>
            {/* <FormGroup>
              <Label className={classes.Label}>Title</Label>
              <Input
                type="text"
                name="articleTitle"
                id="articleTitle"
                placeholder="Enter Title"
                onChange={(e) => this.onChangeArticleTitle(e.target.value)}
                value={this.state.article.title}
              />
            </FormGroup> */}
            <FormGroup>
              <ReactQuill
                ref={(el) => (this.quill = el)}
                value={this.state.comment.reply}
                onChange={(e) => this.onChangeCommentContent(e)}
                theme="snow"
                modules={this.modules}
                formats={this.formats}
                placeholder={"Enter your comment"}
              />
            </FormGroup>
            <Button onClick={() => this.test()}>Test</Button>
          </Col>

          <Col xl={3} lg={3} md={4} sn={12}>
            <Card>
              <CardHeader>Comment Settings</CardHeader>

              <CardBody>
                {/* <FormGroup>
                  <Label className={classes.Label}>Publish</Label>
                  <Input
                    type="select"
                    name="publish"
                    id="publish"
                    onChange={(e) => this.onChangePublish(e.target.value)}
                  >
                    <option>False</option>
                    <option>True</option>
                  </Input>
                </FormGroup> */}

                <FormGroup>
                  <Label className={classes.Label}>Feature Image</Label>
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
                      }
                      console.log("sdfsdf" + uploadState.data.link);
                    }}
                  ></Input>

                  {this.state.hasFeatureImage ? (
                    <img
                      src={this.state.comment.featureImage}
                      className={classes.FeatureImg}
                    />
                  ) : (
                    ""
                  )}
                </FormGroup>
                <FormGroup>
                  <Button color="danger" onClick={(e) => this.submitComment()}>
                    {" "}
                    Submit
                  </Button>
                </FormGroup>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default NewComment;
