import React from 'react';
import {
  Navbar, Container, Nav, NavDropdown,
} from 'react-bootstrap';
import MessageIcon from './Message-icon-grey.png';
import { getCurrUserInfo, setCurrentUser } from '../mockBackend/mockBackend';

/** The main menu bar that will be at the top of our pages */
export default function MenuBar() {
  const imageLink = getCurrUserInfo().profPic;
  return (
    <Navbar collapseOnSelect expand="lg" variant="dark" style={{ backgroundColor: '#2D4F68', marginBottom: '20px' }}>
      <Container>
        <Nav>
          {/* TODO: update this once the backend user image is available */}
          <NavDropdown title={(
            <img
              src={imageLink}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="Menu"
            />
)}
          >
            <NavDropdown.Item href="/account">My account</NavDropdown.Item>
            <NavDropdown.Item href="/post">View/Post items</NavDropdown.Item>
            <NavDropdown.Item onClick={() => {
              setCurrentUser('');
              window.location.href = '/login';
            }}
            >
              Sign out
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav className="mx-auto">
          <Navbar.Brand href="/">ClothesMatcher</Navbar.Brand>
        </Nav>
        <Nav>
          <Nav.Link href="/messages">
            <img
              src={MessageIcon}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="a message icon"
            />
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
