import React, { useState } from 'react';
import {
  Button, Col, Container, Form, Row,
} from 'react-bootstrap';
import { newPost } from '../mockBackend/mockBackend';
import makeAlert from './alerts';

/** Component to create a new post, used by the post page */
function NewPost({ updatePosting, setSuccess }) {
  /** Define the states that will be updated by the form */
  const [displayImage, updateDisplayImage] = useState(false);
  const [imageLink, updateImageLink] = useState('');
  const [title, updateTitle] = useState('');
  const [size, updateSize] = useState('');
  const [style, updateStyle] = useState('');
  const [zip, updateZip] = useState('');
  const [comment, updateComment] = useState('');
  const [message, updateMessage] = useState('');

  /** This function is called when the user tries to submit a new item */
  function handleSubmitItem(event) {
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
    // if these conditions are met, make a new post and go back to the list
    newPost(title, size, style, zip, comment, imageLink);
    setSuccess('Item added successfully!');
    updatePosting(false);
  }

  /** Define the second column -- either an image or a place to upload one */
  let secondDiv;
  if (displayImage) {
    secondDiv = (
      <div>
        <img className="ClothesMatcher-img" src={imageLink} alt="Your clothing item" />
      </div>
    );
  } else {
    secondDiv = (
      <Form>
        <Form.Group style={{ justifyContent: 'top', margin: 'auto' }}>
          <Form.Label>Image link:</Form.Label>
          <Form.Control style={{ marginBottom: '10px' }} placeholder="Enter image link" onChange={(event) => updateImageLink(event.target.value)} />
          <Button className="ClothesMatcher-button-small" onClick={() => { if (imageLink) { updateDisplayImage(true); } }}>Upload Image</Button>
        </Form.Group>
      </Form>
    );
  }

  /** Define the error div, if one is needed */
  let errorDiv;
  if (message) {
    errorDiv = makeAlert(message, true);
  } else {
    errorDiv = <div />;
  }

  /** Render the component */
  return (
    <div>
      <h1 className="ClothesMatcher-header">
        Post new item
      </h1>
      {errorDiv}
      <Container>
        <Row style={{ marginBottom: '10px' }}>
          <Col className="Responsive-Col">
            <Form>
              <Form.Group style={{ justifyContent: 'center', margin: 'auto' }}>
                <Form.Label>Title:</Form.Label>
                <Form.Control placeholder="Enter title" onChange={(event) => updateTitle(event.target.value)} />
                <Form.Label style={{ marginTop: '15px' }}>Size:</Form.Label>
                <Form.Control placeholder="Enter size" onChange={(event) => updateSize(event.target.value)} />
                <Form.Label style={{ marginTop: '15px' }}>Style:</Form.Label>
                <Form.Control placeholder="Enter style" onChange={(event) => updateStyle(event.target.value)} />
                <Form.Label style={{ marginTop: '15px' }}>ZIP:</Form.Label>
                <Form.Control placeholder="Enter zip code" onChange={(event) => updateZip(event.target.value)} />
                <Form.Label style={{ marginTop: '15px' }}> Comment:</Form.Label>
                <Form.Control as="textarea" rows={2} placeholder="Enter comment" onChange={(event) => updateComment(event.target.value)} />
              </Form.Group>
            </Form>
            <Container className="button-holder">
              <button type="submit" className="ClothesMatcher-button-small" onClick={handleSubmitItem}> Submit </button>
              <button type="button" className="ClothesMatcher-button-small" onClick={() => updatePosting(false)} style={{ background: 'white' }}> Cancel </button>
            </Container>
          </Col>
          <Col className="Responsive-Col">
            {secondDiv}
          </Col>
        </Row>
      </Container>

    </div>
  );
}
export default NewPost;
