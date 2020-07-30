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

const db = firebase.firestore();

class NewArticle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      article: {
        title: "",
        content: "",
        createDate: new Date(),
        featureImage: "",
        isPublish: "",
        lasModified: new Date(),
        createUserID: "",
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

  onChangePublish = (value) => {
    this.setState({
      article: {
        ...this.state.article,
        isPublish: value === "True",
      },
    });
  };

  submitArticle = () => {
    const article = this.state.article;
    article.createUserID = this.props.auth.uid;
    db.collection("Articles")
      .add(article)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <Container>
        <Row>
          <Col xl={9} lg={8} md={8} sn={12}>
            <h2 className={classes.SectionTitle}>New Article</h2>
            <FormGroup>
              <Label className={classes.Label}>Title</Label>
              <Input
                type="text"
                name="articleTitle"
                id="articleTitle"
                placeholder="Enter Title"
                onChange={(e) => this.onChangeArticleTitle(e.target.value)}
                value={this.state.article.title}
              />
            </FormGroup>
            <FormGroup>
              <ReactQuill
                ref={(el) => (this.quill = el)}
                value={this.state.article.content}
                onChange={(e) => this.onChangeArticleContent(e)}
                theme="snow"
                modules={this.modules}
                formats={this.formats}
              />
            </FormGroup>
          </Col>
          <Col xl={3} lg={3} md={4} sn={12}>
            <Card>
              <CardHeader>Article Settings</CardHeader>
              <CardBody>
                <FormGroup>
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
                </FormGroup>
                <FormGroup>
                  <Button color="danger" onClick={(e) => this.submitArticle()}>
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

export default NewArticle;
