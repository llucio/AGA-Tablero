import { Fragment } from 'react';
import * as Sentry from '@sentry/browser';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Container from 'react-bootstrap/Container';
import AuthProvider from './keycloak';
import { apolloClient } from './apollo';
import Header from './components/Layout/Header';
import MenuPrincipal from './components/Layout/MenuPrincipal';
import BreadcrumbBar from './components/Layout/BreadcrumbBar';
import Footer from './components/Layout/Footer';
import CompromisoList from './components/Compromiso/CompromisoList';
import CompromisoDetail from './components/Compromiso/CompromisoDetail';
import AccionDetail from './components/Accion/AccionDetail';
import ScrollToTop from './components/ScrollToTop';

import 'bootstrap/dist/css/bootstrap.css';

const SENTRY_DSN = process.env.REACT_APP_SENTRY_DSN;
if (SENTRY_DSN) {
  Sentry.init({ dsn: SENTRY_DSN });
}

const routes = [
  {
    path: '/',
    component: CompromisoList,
    headerProps: {
      subheading:
        'En este espacio podrás dar seguimiento y monitorear el avance de los compromisos que México adoptó en su 4° Plan de Acción Nacional 2019-2021 en la Alianza para el Gobierno Abierto.',
    },
  },
  {
    path: '/compromiso/:compromisoSlug',
    component: CompromisoDetail,
  },
  {
    path: '/compromiso/:compromisoSlug/:accionId',
    component: AccionDetail,
  },
];

const theme = {
  calendarIcon: {
    textColor: 'white',
    primaryColor: '#0da472',
    backgroundColor: '#fafafa',
  },
};

const App = () => (
  <AuthProvider>
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <Router>
          <ScrollToTop />
          {routes.map(
            ({ path, exact = true, component: Component, headerProps }) => (
              <Route
                key={path}
                path={path}
                exact={exact}
                component={() => (
                  <Fragment>
                    <MenuPrincipal />
                    <Header headerProps={headerProps} />
                    <section id="one" className="vertical-margin-top-middle">
                      <Container>
                        <BreadcrumbBar />
                        <Component />
                      </Container>
                    </section>
                    <Footer />
                  </Fragment>
                )}
              />
            )
          )}
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  </AuthProvider>
);

export default App;
