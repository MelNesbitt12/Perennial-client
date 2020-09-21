import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

// Links that display in header for signed-in users only
const authenticatedOptions = (
  <Fragment>
    {/* <Nav.Link href="#">Home</Nav.Link > */}
    <Nav.Link href="#profile">Profile</Nav.Link>
    {/* <Nav.Link href="#how-to">Getting Started</Nav.Link> */}
    <Nav.Link href="#renewals">Your Renewals</Nav.Link>
    <Nav.Link href="#renewals-create">Add Renewal</Nav.Link>
    <Nav.Link href="#change-password">Change Password</Nav.Link>
    <Nav.Link href="#sign-out">Sign Out</Nav.Link>
  </Fragment>
)

// Links that display in header for new users/users that are not yet signed in
const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link href="#sign-up">Sign Up</Nav.Link>
    <Nav.Link href="#sign-in">Sign In</Nav.Link>
  </Fragment>
)

// Header where links will be displayed for authenticated and unauthenticated users
const Header = ({ user }) => (
  <Navbar className="navbar" bg="transparent" variant="light" expand="md" style={{ fontSize: '20px' }}>
    <Navbar.Brand style={{ fontSize: '25px' }} href="#">
      Perennial
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        { user && <span className="navbar-text mr-2">Welcome, {user.username}</span>}
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
