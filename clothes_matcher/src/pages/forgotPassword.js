/** This is a very basic mockup of the forgot password page
 * TODO: @cynthyee implement functionality */

/** Necessary imports */
import React, { useState } from 'react';
import '../App.css';
import { Button, Container, Form } from 'react-bootstrap';
import { checkEmailExists } from '../mockBackend/mockBackend';
import makeAlert from '../components/alerts';

/** This function defines the appearance of our forgot password page */
function ForgotPassword() {
  // define the states that will be used (feel free to use more)
  const [email, updateEmail] = useState('');
  const [err, updateErr] = useState('');

  // handle the submission attempt
  function handleSubmit(event) {
    updateErr('');
    event.preventDefault();
    if (!checkEmailExists(email)) {
      updateErr('Email does not exist!');
    }
    // TODO: handle emailing/reset link etc.
  }

  // display errors as needed
  let errDiv;
  if (err) {
    if (err) {
      errDiv = makeAlert(err, true);
    } else {
      errDiv = <div />;
    }
  }

  // defines the HMTL that renders the page
  return (
    <div className="vertical-center">
      <h1 className="ClothesMatcher-header">
        ClothesMatcher
      </h1>
      {errDiv}
      <Form
        className="ClothesMatcher-login-box"
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        <h3 className="ClothesMatcher-header">
          Forgot password?
        </h3>
        <Form.Group style={{ justifyContent: 'center', margin: 'auto' }}>
          <Form.Label>Email:</Form.Label>
          <br />
          <Form.Control style={{ marginBottom: '15px' }} placeholder="Enter email" onChange={(event) => updateEmail(event.target.value)} />
          <Container className="button-holder">
            <Button
              className="ClothesMatcher-button-small"
              onClick={(event) => { handleSubmit(event); }}
            >
              Reset Password
            </Button>
            <Button className="ClothesMatcher-button-small" href="/login" style={{ background: 'white' }}>Cancel</Button>
          </Container>
        </Form.Group>
      </Form>
    </div>
  );
}

export default ForgotPassword;
