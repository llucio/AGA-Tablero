import React from 'react';
import { Route, useLocation } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import Hidden from '@material-ui/core/Hidden';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import BreadcrumbCompromiso from './BreadcrumbCompromiso';
import BreadcrumbHito from './BreadcrumbHito';

const BreadcrumbBar = (props) => {
  const { path } = useLocation();

  return (
    <Breadcrumb>
      <LinkContainer to="/">
        <Breadcrumb.Item active={path === '/'}>
          <Hidden smDown>4&ordm; Plan de Acción</Hidden>
          <Hidden mdUp>4&ordm; Plan</Hidden>
        </Breadcrumb.Item>
      </LinkContainer>
      <Route
        path="/compromiso"
        component={() => <Breadcrumb.Item active>Compromiso</Breadcrumb.Item>}
      />
      <Route path="/accion-clave/" component={BreadcrumbCompromiso} />
      <Route path="/accion-clave/" component={BreadcrumbHito} />
    </Breadcrumb>
  );
};

export default BreadcrumbBar;
