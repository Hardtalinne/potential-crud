// import React, { Component } from "react";
import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import { IoIosPeople } from "react-icons/io";

function MenuSuperior() {
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand className="ms-3">
          <IoIosPeople size="45px" />
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link>
            <Link to="/home" style={{ textDecoration: "none", color: "#fff" }}>
              Listar
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link
              to="/cadastrar"
              style={{ textDecoration: "none", color: "#fff" }}
            >
              Cadastrar
            </Link>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default MenuSuperior;
