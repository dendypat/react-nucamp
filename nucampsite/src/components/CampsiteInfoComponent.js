import React, { Component } from 'react';
import {
  Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem,
  Modal, Label, Col, Row, ModalBody, ModalHeader, Button
} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import 'font-awesome/css/font-awesome.css';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

function RenderCampsite({ campsite }) {
  return (
    <div className=" col-md-5 m-1">
      <Card>
        <CardImg top src={baseUrl + campsite.image} alt={campsite.name} />
        <CardBody>
          <CardText>{campsite.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}
function RenderComments({ comments, addComment, campsiteId }) {
  if (comments) {
    return (<div className="col-md-5 m-1">
      <h4>Comments</h4>
      {comments.map(comment => {
        return (
          <div key={comment.id}>
            {comment.text}
            <br /> --{comment.author},  {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}
          </div>
        );
      })}
      <CommentForm  campsiteId={campsiteId} addComment={addComment}/>
    </div>
    )
  }
  return <div />;
}
function CampsiteInfo(props) {
  if (props.isLoading) {
    return (
        <div className="container">
            <div className="row">
                <Loading />
            </div>
        </div>
    );
}
if (props.errMess) {
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        </div>
    );
}
  if (props.campsite) {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <Breadcrumb>
              <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
              <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
            </Breadcrumb>
            <h2>{props.campsite.name}</h2>
            <hr />
          </div>
        </div>
        <div className="row">
          <RenderCampsite campsite={props.campsite} />
          <RenderComments
            comments={props.comments}
            postComment={props.postComment}
            campsiteId={props.campsite.id}
          />
        </div>
      </div>
    );
  }
  return <div />;
}

class CommentForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      rating: '',
      author: '',
      text: '',
      isModalOpen: false,
      touched: {
        author: false
      }
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  handleSubmit(values) {
    this.toggleModal();
    this.props.postComment(this.props.campsiteId, values.rating, values.author, values.text)
  }

  render() {

    return (
      <div>
        <Button outline onClick={this.toggleModal}><i className="fa fa-pencil "></i> Submit Comment</Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}> {/* Where would the div className="form-group go?" */}
          <ModalHeader toggle={this.toggleModal}> Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={values => this.handleSubmit(values)}>
              <Row className="form-group">
                <Label htmlFor="rating" md={2}>Rating</Label>
                <Col md={10}>
                  <Control.select model=".rating" id="rating" name="rating"
                    className="form-control">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="author" md={2}>Author</Label>
                <Col md={10}>
                  <Control.text model=".author" id="author" name="author"
                    className="form-control"
                    validators={{
                      required,
                      minLength: minLength(2),
                      maxLength: maxLength(15)
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    component="div"
                    messages={{
                      required: 'Required',
                      minLength: 'Must be at least 2 characters',
                      maxLength: 'Must be 15 characters or less'
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="text" md={2}>Text</Label>
                <Col md={10}>
                  <Control.textarea model=".text" id="text" name="text" rows="6"
                    className="form-control"
                  />
                </Col>
              </Row>
              <Button type="submit" value="submit" color="primary">Submit Comment</Button>
            </LocalForm>
          </ModalBody>
        </Modal>

      </div>


    )
  }
}


export default CampsiteInfo;
