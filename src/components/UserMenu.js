import React from 'react';
import { useRoles } from '../hooks';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const UserMenu = () => {
  const { loading, authenticated, usuario, login, logout } = useRoles();

  if (loading) return null;

  return (
    <Card style={{ width: '18rem' }}>
      {authenticated ? (
        <Card.Body>
          <Card.Title>{usuario.name}</Card.Title>
          <Card.Text>{usuario.email}</Card.Text>
          <Card.Text>
            Es administrador: {usuario.administrador ? 'sí' : 'no'}
          </Card.Text>
          {!!usuario.organizacion && (
            <Card.Text>
              Responsable de organizacion: {usuario.organizacion}
            </Card.Text>
          )}
          {!!usuario.institucion && (
            <Card.Text>
              Responsable de institucion: {usuario.institucion}
            </Card.Text>
          )}
          <button onClick={() => logout()}>Cerrar sesión</button>
        </Card.Body>
      ) : (
        <Card.Body>
          <button onClick={() => login()}>Identifícate</button>
        </Card.Body>
      )}
    </Card>
  );
  return;
};

export default UserMenu;
