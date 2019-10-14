import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { LinkContainer } from 'react-router-bootstrap';
import Container from 'react-bootstrap/Container';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import AuthProvider from './keycloak';
import { useRoles } from './hooks';
import { apolloClient } from './apollo';
import CompromisoBrowser from './components/CompromisoBrowser';
import CompromisoDetail from './components/CompromisoDetail';
import CompromisoEdit from './components/CompromisoEdit';

const routes = [
  {
    path: '/',
    content: CompromisoBrowser,
    heading: '¡Conoce los avances de los compromisos de Gobierno Abierto',
    subheading:
      'En este espacio podrás dar seguimiento y monitorear el avance de los compromisos que México adoptó en su 4° Plan de Acción Nacional 2019-2021 en la Alianza para el Gobierno Abierto.',
    image: '/assets/images/planes_de_accion.jpg',
    headerClass: 'medium'
  },
  {
    path: ['/compromiso/nuevo', '/compromiso/:id/editar'],
    content: CompromisoEdit,
    heading: 'Hoja de Ruta',
    subheading:
      'En este espacio podrás dar seguimiento y monitorear el avance de los compromisos que México adoptó en su 4° Plan de Acción Nacional 2019-2021 en la Alianza para el Gobierno Abierto.',
    headerClass: 'medium'
  },
  {
    path: '/compromiso/:id',
    content: CompromisoDetail,
    heading: '¡Conoce los avances de los compromisos de Gobierno Abierto!',
    headerClass: 'medium'
  }
];

// bootstrap theme
const theme = {
  calendarIcon: {
    textColor: 'white', // text color of the header and footer
    primaryColor: '#0da472', // background of the header and footer
    backgroundColor: '#fafafa'
  }
};

const App = () => (
  <AuthProvider>
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <AppRouter />
      </ThemeProvider>
    </ApolloProvider>
  </AuthProvider>
);

const AppRouter = () => (
  <Router>
    {routes.map(
      ({
        path,
        content: Content,
        heading,
        subheading,
        headerClass,
        image = '/assets/images/decorativa2.jpg',
        headerArrow = false,
        exact = true
      }) => (
        <Route
          key={path}
          path={path}
          exact={exact}
          component={props => (
            <React.Fragment>
              {!!heading && (
                <section
                  id="banner"
                  className={headerClass}
                  style={{ backgroundImage: `url(${image})` }}
                >
                  <div className="content">
                    <header>
                      <h2 className="big shadow-text">{heading}</h2>
                      {subheading && (
                        <h4 className="mt-4 lead shadow-text">{subheading}</h4>
                      )}
                    </header>
                  </div>
                  {headerArrow && (
                    <a href="#one" className="goto-next scrolly">
                      Siguiente
                    </a>
                  )}
                </section>
              )}
              <section id="one" className="wrapper style1 special top">
                <Container>
                  <Breadcrumbs {...props} />
                  <Content {...props} />
                </Container>
              </section>
            </React.Fragment>
          )}
        />
      )
    )}
  </Router>
);

const Breadcrumbs = ({ match, ...props }) => {
  const { authenticated, administrador, loading, login, logout } = useRoles();

  if (loading) return null;

  return (
    <Breadcrumb>
      {!!authenticated ? (
        <button type="button" onClick={() => logout()}>
          Logout
        </button>
      ) : (
        <button type="button" onClick={() => login()}>
          Login
        </button>
      )}
      <LinkContainer to="/">
        <Breadcrumb.Item>4&ordm; Plan de Acción</Breadcrumb.Item>
      </LinkContainer>
      {administrador && (
        <LinkContainer to="/compromiso/nuevo">
          <Breadcrumb.Item>Crear compromiso</Breadcrumb.Item>
        </LinkContainer>
      )}
      <Switch>
        <Route
          path="/compromiso"
          component={() => <Breadcrumb.Item active>Compromiso</Breadcrumb.Item>}
        />
      </Switch>
    </Breadcrumb>
  );
};

export default App;
