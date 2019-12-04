import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { LinkContainer } from 'react-router-bootstrap';
import Container from 'react-bootstrap/Container';
import Box from '@material-ui/core/Box';
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
        component={() => (
          <Breadcrumb.Item active>Compromisofcons</Breadcrumb.Item>
        )}
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
