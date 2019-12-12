import React from 'react';
import { Route } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import Hidden from '@material-ui/core/Hidden';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import BreadcrumbCompromiso from './BreadcrumbCompromiso';
import BreadcrumbHito from './BreadcrumbHito';

const BreadcrumbBar = ({ match, ...props }) => {
  const hitoId = match.params.id;
  return (
    <Breadcrumb>
      <LinkContainer to="/">
        <Breadcrumb.Item active={match.path === '/'}>
          <Hidden smDown>4&ordm; Plan de Acción</Hidden>
          <Hidden mdUp>4&ordm; Plan</Hidden>
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
        component={({ match }) => <BreadcrumbHito hitoId={hitoId} />}
      />
      {/*<Route
        path="/accion-clave/"
        component={({ match }) => (
          <>
            <Breadcrumb.Item active>
              <strong>Acción clave</strong>
            </Breadcrumb.Item>
          </>
        )}
      />*/}
    </Breadcrumb>
  );
};

export default BreadcrumbBar;
