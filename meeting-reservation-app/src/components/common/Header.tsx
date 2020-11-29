import * as React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { NavLink } from "react-router-dom";


const Header: React.FC = () => (
<Navbar bg="light" expand="lg">
  <Navbar.Brand href="#home">Meeting reservation</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
  
    <Nav className="mr-auto">
    <Nav.Link as={NavLink} to='/' exact>Your Reservation</Nav.Link>
    <Nav.Link as={NavLink} to='/Reservation'>Reservation</Nav.Link>
    </Nav>

  </Navbar.Collapse> 
</Navbar>);

export default Header;