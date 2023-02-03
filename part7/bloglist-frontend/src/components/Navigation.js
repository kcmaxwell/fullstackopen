import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const Navigation = () => (
  <div>
    <Navbar
      collapseOnSelect
      expand='lg'
      bg='light'
    >
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='me-auto'>
          <Nav.Link
            href='#'
            as='span'
          >
            <Link to='/'>Home</Link>
          </Nav.Link>
          <Nav.Link
            href='#'
            as='span'
          >
            <Link to='/users'>Users</Link>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </div>
);

export default Navigation;
