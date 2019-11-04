import React from 'react';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

const CompromisoNav = props => {
  const handleSelect = eventKey => alert(`selected ${eventKey}`);

  return (
    <Nav variant="pills" activeKey="1" onSelect={handleSelect}>
      <Nav.Item>
        <Nav.Link eventKey="1" href="#/home">
          Editar encabezado
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="2" title="Item">
          NavLink 2 content
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="3" disabled>
          NavLink 3 content
        </Nav.Link>
      </Nav.Item>
      <NavDropdown title="Añadir" id="nav-dropdown">
        <NavDropdown.Item eventKey="4.1">Compromiso</NavDropdown.Item>
        <NavDropdown.Item eventKey="4.2">Hito</NavDropdown.Item>
        <NavDropdown.Item eventKey="4.3">Entregable</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item eventKey="4.4">Ayuda</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  );
};

export default CompromisoNav;
