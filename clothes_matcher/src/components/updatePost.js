import React, { useState } from 'react';
import {
  Button, Col, Container, Form, Row,
} from 'react-bootstrap';
import { getPostByID, updatePost, deletePost } from '../mockBackend/mockBackend';
import makeAlert from './alerts';

/** This function edits a post */
function EditPost({ postnum, updateEditing, setSuccess }) {
  const itemInfo = getPostByID(postnum);
  const [imageLink, updateImageLink] = useState(itemInfo.image);
  const [title, updateTitle] = useState(itemInfo.title);
  const [size, updateSize] = useState(itemInfo.size);
  const [style, updateStyle] = useState(itemInfo.style);
  const [zip, updateZip] = useState(itemInfo.zip);
  const [comment, updateComment] = useState(itemInfo.comment);
  const [message, updateMessage] = useState('');

  /** Define the error div, if one is needed */
  let errorDiv;
  if (message) {
    errorDiv = makeAlert(message, true);
  } else {
    errorDiv = <div />;
  }

  /** This function is called when a user tries to update an item */
  function handleUpdate(event) {
    // we don't have any error message to display right now
    updateMessage('');
    event.preventDefault();
    // check that all required fields are present
    if (!title || !size || !style || !zip || !imageLink) {
      updateMessage('ERROR: required fields missing');
      return;
    }
    // check that the zip is a 5-digit number
    const parsedZip = parseInt(zip, 10);
    if (parsedZip.isNan || zip.length !== 5) {
      updateMessage('ERROR: zip code is not a valid 5-digit number');
      return;
    }
    // if these conditions are met, update the post
    updatePost(postnum, title, size, style, zip, comment, imageLink);
    setSuccess('Item updated successfully!');
    updateEditing(false);
  }

  /** Render the page */
  return (
    <div>
      <h1 className="ClothesMatcher-header">
        Editing
        {' '}
        {itemInfo.title}
      </h1>
      {errorDiv}
      <Container>
        <Row>
          <Col>
            <Form>
              <Form.Group style={{ justifyContent: 'center', margin: 'auto' }}>
                <Form.Label>Title:</Form.Label>
                <Form.Control
                  placeholder={itemInfo.title}
                  onChange={(event) => updateTitle(event.target.value)}
                />
                <Form.Label style={{ marginTop: '15px' }}>Size:</Form.Label>
                <Form.Control
                  placeholder={itemInfo.size}
                  onChange={(event) => updateSize(event.target.value)}
                />
                <Form.Label style={{ marginTop: '15px' }}>Style:</Form.Label>
                <Form.Control
                  placeholder={itemInfo.style}
                  onChange={(event) => updateStyle(event.target.value)}
                />
                <Form.Label style={{ marginTop: '15px' }}>ZIP:</Form.Label>
                <Form.Control
                  placeholder={itemInfo.zip}
                  onChange={(event) => updateZip(event.target.value)}
                />
                <Form.Label style={{ marginTop: '15px' }}> Comment:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  placeholder={itemInfo.comment}
                  onChange={(event) => updateComment(event.target.value)}
                />
              </Form.Group>
            </Form>
            <Container className="button-holder">
              <Button
                className="ClothesMatcher-button-small"
                onClick={(event) => {
                  handleUpdate(event);
                }}
              >
                Update
              </Button>
              <Button className="ClothesMatcher-button-small" style={{ background: 'white' }} onClick={() => { setSuccess(''); updateEditing(false); }}>Cancel</Button>
              <Button
                className="ClothesMatcher-button-small"
                onClick={() => {
                  deletePost(postnum);
                  setSuccess('Item deleted successfully!');
                  updateEditing(false);
                }}
              >
                Delete Post
              </Button>
            </Container>
          </Col>
          <Col>
            <Form>
              <img className="ClothesMatcher-img" src={imageLink} alt="Your clothing item" />
              <Form.Group style={{ justifyContent: 'top', margin: 'auto' }}>
                <Form.Label>Image link:</Form.Label>
                <Form.Control style={{ marginBottom: '10px' }} placeholder={itemInfo.image} onChange={(event) => updateImageLink(event.target.value)} />
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default EditPost;
