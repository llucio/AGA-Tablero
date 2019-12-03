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
        <Breadcrumb.Item>4&ordm; Plan de Acción</Breadcrumb.Item>
      </LinkContainer>
      <Switch>
        <Route
          path="/compromiso"
          component={() => <Breadcrumb.Item active>Compromiso</Breadcrumb.Item>}
        />
        <Route
          path="/hito"
          component={() => <Breadcrumb.Item active>Hito</Breadcrumb.Item>}
        />
      </Switch>
    </Breadcrumb>
  );
};

export default BreadcrumbBar;
