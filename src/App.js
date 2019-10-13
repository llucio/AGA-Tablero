import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import Container from 'react-bootstrap/Container';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { ThemeProvider } from 'styled-components';
import CompromisoBrowser from './components/CompromisoBrowser';
import CompromisoDetail from './components/CompromisoDetail';
import EncuestaBrowser from './components/EncuestaBrowser';
import { apolloClient } from './apollo';
import { useKeycloak } from 'react-keycloak';

const routes = [
  {
    path: '/',
    content: CompromisoBrowser,
    heading: '¡Conoce los avances de los compromisos de Gobierno Abierto',
    subheading:
      'En este espacio podrás dar seguimiento y monitorear el avance de los compromisos que México adoptó en su 4° Plan de Acción Nacional 2019-2021 en la Alianza para el Gobierno Abierto.',
    image: '/assets/images/planes_de_accion.jpg'
  },
  {
    path: '/compromiso/:id',
    content: CompromisoDetail,
    heading: '¡Conoce los avances de los compromisos de Gobierno Abierto!',
    headerClass: 'medium',
    image:
      'https://images.unsplash.com/photo-1453749024858-4bca89bd9edc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=707&q=80'
  },
  {
    path: '/formulario',
    content: EncuestaBrowser,
    heading: '¡Conoce los avances de los compromisos de Gobierno Abierto!',
    headerClass: 'medium',
    image:
      'https://images.unsplash.com/photo-1453749024858-4bca89bd9edc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=707&q=80'
  }
];

const theme = {
  calendarIcon: {
    textColor: 'white', // text color of the header and footer
    primaryColor: '#0da472', // background of the header and footer
    backgroundColor: '#fafafa'
  }
};

const App = () => (
  <ApolloProvider client={apolloClient}>
    <ThemeProvider theme={theme}>
      <Router>
        {routes.map(
          ({
            path,
            content: Content,
            heading,
            subheading,
            headerClass,
            image,
            headerNextLink = false
          }) => (
            <Route
              key={path}
              path={path}
              exact
              component={props => (
                <React.Fragment>
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
                    {headerNextLink && (
                      <a href="#one" className="goto-next scrolly">
                        Siguiente
                      </a>
                    )}
                  </section>
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
    </ThemeProvider>
  </ApolloProvider>
);

const Breadcrumbs = ({ match, ...props }) => {
  const [keycloak, initialized] = useKeycloak();

  return (
    <Breadcrumb>
      {keycloak.authenticated ? console.log(keycloak) || (
        <button type="button" onClick={() => keycloak.logout()}>
          Logout
        </button>
      ) : (
        <button type="button" onClick={() => keycloak.login()}>
          Login
        </button>
      )}
      <LinkContainer to="/">
        <Breadcrumb.Item>4&ordm; Plan de Acción</Breadcrumb.Item>
      </LinkContainer>
      <LinkContainer to="/formulario">
        <Breadcrumb.Item>Crear compromiso</Breadcrumb.Item>
      </LinkContainer>
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
