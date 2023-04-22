import React, { useState } from 'react';
import '../App.css';
import { Button, Form } from 'react-bootstrap';
import { addUser, setCurrentUser } from '../mockBackend/mockBackend';
import makeAlert from '../components/alerts';

/** This function defines the appearance of our sign up page */
function SignUp() {
  // the states that store the information in the form (feel free to add more)
  const [firstname, updateFirstname] = useState('');
  const [lastname, updateLastname] = useState('');
  const [email, updateEmail] = useState('');
  const [password, updatePassword] = useState('');
  const [confirmPassword, updateConfirmPassword] = useState('');
  const [agreement, updateAgreement] = useState(false);
  const [error, setError] = useState('');

  // the function that is called when the user tries to sign up
  function handleSignUpAttempt(event) {
    event.preventDefault();
    setError('');
    // Check for empty fields
    if (!firstname || !lastname || !email || !password || !confirmPassword) {
      setError('Please fill in all required fields!');
    } else if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email))) {
      // Verify email validity
      setError('Invalid email format!');
    } else if (password.length < 6 || confirmPassword.length < 6) {
      // Minimum password length
      setError('The password length is too short!');
    } else if (!agreement) {
      // Must agree to terms & conditions
      setError('Please agree to our terms & conditions');
    } else if (password !== confirmPassword) {
      // Passwords must match
      setError('Passwords must match!');
    } else {
      // Add the user if possible
      const res = addUser(password, email, firstname, lastname);
      if (!res.success) {
        setError(res.error);
      } else {
        setCurrentUser(email);
        window.location.href = '/';
      }
    }
  }

  // render any errors if needed
  let errorDiv;
  if (error) {
    errorDiv = makeAlert(error, true);
  } else {
    errorDiv = <div />;
  }

  // defines the HMTL that will be used to render the sign-up page
  return (
    <div className="vertical-center">
      <h1 className="ClothesMatcher-header">
        Register with ClothesMatcher!
      </h1>
      {errorDiv}
      <Form
        className="ClothesMatcher-login-box"
        onSubmit={(event) => {
          handleSignUpAttempt(event);
        }}
      >
        <Form.Group style={{ justifyContent: 'center', margin: 'auto' }}>
          <Form.Label>First Name:</Form.Label>
          <br />
          <Form.Control placeholder="Enter first name" onChange={(event) => updateFirstname(event.target.value)} />
          <Form.Label style={{ marginTop: '15px' }}>Last Name:</Form.Label>
          <br />
          <Form.Control placeholder="Enter last name" onChange={(event) => updateLastname(event.target.value)} />
          <Form.Label style={{ marginTop: '15px' }}>Email:</Form.Label>
          <br />
          <Form.Control placeholder="Enter email" onChange={(event) => updateEmail(event.target.value)} />
          <Form.Label style={{ marginTop: '15px' }}>Password:</Form.Label>
          <br />
          <Form.Control type="password" placeholder="Enter password" onChange={(event) => updatePassword(event.target.value)} />
          <Form.Label style={{ marginTop: '15px' }}> Confirm password:</Form.Label>
          <br />
          <Form.Control type="password" placeholder="Enter password" onChange={(event) => updateConfirmPassword(event.target.value)} />
          <Form.Check style={{ marginTop: '15px', marginBottom: '15px' }} type="checkbox" label="By continuing, you agree to our Privacy Policy & Terms of Service" onChange={() => updateAgreement(!agreement)} />
          <Button className="ClothesMatcher-button-small" onClick={(event) => { handleSignUpAttempt(event); }}>Sign up</Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default SignUp;
