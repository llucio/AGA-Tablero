import React from 'react';
import { Route } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import BreadcrumbCompromiso from './BreadcrumbCompromiso';

const BreadcrumbBar = ({ match, ...props }) => {
  const hitoId = match.params.id;
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
        component={({ match }) => <BreadcrumbCompromiso hitoId={hitoId} />}
      />
      <Route
        path="/accion-clave/"
        component={({ match }) => (
          <>
            <Breadcrumb.Item active>
              <strong>Acción clave</strong>
            </Breadcrumb.Item>
          </>
        )}
      />
    </Breadcrumb>
  );
};

export default BreadcrumbBar;
