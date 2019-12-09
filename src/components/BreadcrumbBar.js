import React from 'react';
import { Route } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

const BreadcrumbBar = ({ match, ...props }) => {
  return (
    <Breadcrumb>
      <LinkContainer to="/">
        <Breadcrumb.Item active={match.path === '/'}>
          4&ordm; Plan de Acción
        </Breadcrumb.Item>
      </LinkContainer>
      <Route
        path="/compromiso"
        component={() => <Breadcrumb.Item active>Compromiso</Breadcrumb.Item>}
      />
      <Route
        path="/accion-clave/"
        component={({ match }) => (
          <>
            <Breadcrumb.Item>Compromiso</Breadcrumb.Item>
            <Breadcrumb.Item active>Acción clave</Breadcrumb.Item>
          </>
        )}
      />
    </Breadcrumb>
  );
};

export default BreadcrumbBar;
