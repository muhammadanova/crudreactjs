import React from 'react';
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'

class Header extends React.Component {
  state = {}

  render(){
    return (
      <Navbar bg="light" expand="lg">
        <div className="container">
          <Navbar.Brand href="#home" className="mr-lg-5">
            <img src="/img/react.png" className="logo-headers" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/" tag={Link} className="mr-4">Persons</Nav.Link>
              <Nav.Link href="/Employees" tag={Link}  className="mr-4">Employees</Nav.Link>
              <NavDropdown title="Users" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Login</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Register</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </div>
      </Navbar>
    )
  }
}

export default Header