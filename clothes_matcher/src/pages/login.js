import React, { useState } from 'react';
import '../App.css';
import { Button, Form } from 'react-bootstrap';
import { checkLogin, setCurrentUser } from '../mockBackend/mockBackend';
import makeAlert from '../components/alerts';

/** This function defines the look & behavior of our login page */
function Login() {
  // we use state to store the email and password
  const [username, updateUsername] = useState('');
  const [password, updatePassword] = useState('');
  const [error, setError] = useState('');

  // handle the attempt to login
  function handleLoginAttempt(event) {
    event.preventDefault();
    setError('');
    if (!username || !password) {
      setError('Please fill in all fields!');
    } else {
      const res = checkLogin(username, password);
      if (res.success) {
        setCurrentUser(username);
        window.location.href = '/';
      } else {
        setError(res.error);
      }
    }
  }
  // display any errors if necessary
  let errorDiv;
  if (error) {
    errorDiv = makeAlert(error, true);
  } else {
    errorDiv = <div />;
  }
  return (
    <div className="vertical-center">
      <h1 className="ClothesMatcher-header">
        Welcome to ClothesMatcher!
      </h1>
      {errorDiv}
      <Form
        className="ClothesMatcher-login-box"
        onSubmit={(event) => {
          handleLoginAttempt(event);
        }}
      >
        <Form.Group style={{ justifyContent: 'center', margin: 'auto' }}>
          <Form.Label>Email:</Form.Label>
          <br />
          <Form.Control placeholder="Enter email" onChange={(event) => updateUsername(event.target.value)} />
          <Form.Label style={{ marginTop: '15px' }}>Password:</Form.Label>
          <br />
          <Form.Control type="password" placeholder="Enter password" onChange={(event) => updatePassword(event.target.value)} />
          <p><a href="/reset">Forgot Password?</a></p>
          <Button
            className="ClothesMatcher-button-small"
            onClick={(event) => { handleLoginAttempt(event); }}
          >
            Sign in
          </Button>
          <p style={{ marginTop: '15px', textAlign: 'center' }}>
            By continuing, you agree to our
            <b>Privacy Policy & Terms of Service</b>
            .
          </p>
          <p style={{ textAlign: 'center' }}>
            Don't have an account already?
            <a href="/signup">Sign up.</a>
          </p>
        </Form.Group>
      </Form>
    </div>
  );
}

export default Login;
